<?php

namespace App\Http\Controllers;

use App\Models\BusProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use App\Models\ProProfile;
use App\Models\Reservation;
use Illuminate\Support\Str;
use Response;
use \stdClass;
use Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Log;
use Illuminate\Auth\Authenticatable as Authenticatable;
use LDAP\Result;

class ReservationController extends Controller
{

    //get all offers
    function getAll(Request $request){
        $return = new stdClass;
        $user = auth('api')->user();

        $offered = Reservation::where("offered_by","=",$user->id)
            ->where("parent_id","=","0")
            ->with("offered_to")
            ->get();

        $received = Reservation::where("offered_to","=",$user->id)
            ->where("parent_id","=","0")
            ->with("offered_by")
            ->get();

        $return->data = new stdClass;
        $return->data->offered = $offered;
        $return->data->received = $received;
        return $return;
    }

    //Get Specific Offer
    function get(Request $request, $uuid){
        $return = new stdClass;
        $user = auth('api')->user();

        $reservation = Reservation::where("uuid","=",$uuid)
                        ->with("offered_to")
                        ->with("offered_by")
                        ->first();

        $reservations = Reservation::where("parent_id","=",$reservation->id)
                        ->with("offered_to")
                        ->with("offered_by")
                        ->first();

        $return->data = new stdClass;
        $return->data->parent_reservation = $reservation;
        $return->data->reservations = $reservations;

        return $return;

    }

    //Create Reservation
    function create(Request $request){
        $return = new stdClass;
        $user = auth('api')->user();



        $offered_to = User::where("uuid","==",'b94a089b-6779-47a7-b5e4-9096c78392f3')->first();



        response()->json(['data' => $offered_to], 200);
//        if(!$offered_to){
//            return response()->json(['data' => "User Not Found"], 200);
//        }
//
//        try{
//            $reservation = Reservation::create([
//                'uuid'=>(string) Str::uuid(),
//                'parent_id'=>"0",
//                'offered_by'=>$user->id,
//                'offered_to'=>$offered_to->id,
//                'start_date'=>$request->start_date,
//                'end_date'=>$request->end_date,
//                'pay_rate'=>$request->pay_rate,
//                'pay_duration'=>$request->pay_duration,
//                'location'=>$request->location,
//                'description'=>$request->description,
//                'status'=>"open",
//            ]);
//        }catch(\Exception $e){
//            return parent::respondWithError("Error creating reservation: ".$e->getMessage());
//        }
//
//        $return = $reservation->uuid;
//        return $return;
    }

    function counter(Request $request, $uuid){
        $return = new stdClass;
        $user = auth('api')->user();

        $parent = Reservation::where("uuid","=",$uuid)->first();
        if(!$parent){
            return response()->json(['data' => "Reservation Not Found"], 200);
        }

        $offered_to = User::where("uuid","=",$uuid)->first();

        if(!$offered_to){
            return response()->json(['data' => "User Not Found"], 200);
        }

        try{
            $reservation = Reservation::create([
                'uuid'=>(string) Str::uuid(),
                'parent_id'=>$parent->id,
                'offered_by'=>$user->id,
                'offered_to'=>$offered_to->id,
                'start_date'=>$request->start_date,
                'end_date'=>$request->end_date,
                'pay_rate'=>$request->pay_rate,
                'pay_duration'=>$request->pay_duration,
                'location'=>$request->location,
                'description'=>$request->description,
                'status'=>"open",
            ]);
        }catch(\Exception $e){
            return parent::respondWithError("Error creating reservation: ".$e->getMessage());
        }
        $parent->status = "closed";
        $parent->save();

        $return->uuid = $reservation->uuid;
        return $return;

    }

    function accept(Request $request, $uuid){
        $return = new stdClass;
        $user = auth('api')->user();

        $reservation = Reservation::where("uuid","=",$uuid)->first();

        if(!$reservation){
            return response()->json(['data' => "Reservation Not Found"], 200);
        }

        if($user->type == "pro"){
            $pro_id = $user->id;
            if($reservation->offered_by == $pro_id){
                $bus_id = $reservation->offered_to;
            }else{
                $bus_id = $reservation->offered_by;
            }
        }else{
            $bus_id = $user->id;
            if($reservation->offered_by == $bus_id){
                $pro_id = $reservation->offered_to;
            }else{
                $pro_id = $reservation->offered_by;
            }
        }

        if($reservation->status == "open"){
            try{
                $contract = Contract::create([
                    'uuid' => (string) Str::uuid(),
                    'pro_id' => $pro_id,
                    'bus_id' => $bus_id,
                    'start_date' => $reservation->start_date,
                    'end_date' => $reservation->end_date,
                    'pay_rate' => $reservation->pay_rate,
                    'pay_duration' => $reservation->pay_duration,
                    'location' => $reservation->location,
                    'description' => $reservation->description,
                    'additional_terms' => $request->additional_terms,
                    'pro_acceptance' => "",
                    'bus_acceptance' => "",
                ]);
            }catch(\Exception $e){
                return parent::respondWithError("Error creating contract: ".$e->getMessage());
            }

        }else{
            return response()->json(['data' => "Expired Offered"], 200);
        }
    }

    //user approve contract
    function approveContract(Request $request, $uuid){
        $return = new stdClass;
        $user = auth('api')->user();

        $contract = Contract::where("uuid","=",$uuid)->first();

        if(!$contract){
            return response()->json(['data' => "Contract Not Found"], 200);
        }

        if($user->type == "pro"){
            $contract->pro_acceptance = Carbon\Carbon::now();
            try{
                $contract->save();
            }catch(\Exception $e){
                return parent::respondWithError("Error signing contract: ".$e->getMessage());
            }
        }else{
            $contract->bus_acceptance = Carbon\Carbon::now();
            try{
                $contract->save();
            }catch(\Exception $e){
                return parent::respondWithError("Error signing contract: ".$e->getMessage());
            }
        }

        $return->data = new stdClass;
        $return->data = ["pro_signed"=>$contract->pro_acceptance,"bus_signed"=>$contract->bus_acceptance];
        return $return;
    }
}
