<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RechercheController extends Controller
{
    // Recherche par MSISDN dans OCC et MMG
    public function searchMsisdn($msisdn)
    {
        // Recherche dans OCC
        $occ = DB::table('RA_T_OCC_CDR_DETAIL')
            ->where('A_MSISDN', $msisdn)
            ->select('A_MSISDN', 'B_MSISDN', 'START_DATE', 'START_HOUR', 'EVENT_TYPE', 'CALL_TYPE', 'PARTNER', 'CHARGE_AMOUNT', 'KEYWORD')
            ->get();

        // Recherche dans MMG
        $mmg = DB::table('RA_T_MMG_CDR_DETAIL')
            ->where('A_MSISDN', $msisdn)
            ->select('A_MSISDN', 'B_MSISDN', 'START_DATE', 'START_HOUR', 'EVENT_TYPE', 'CALL_TYPE', 'SERVICE_TYPE', 'ORIG_START_TIME')
            ->get();

        return response()->json([
            'msisdn' => $msisdn,
            'occ'    => $occ,
            'mmg'    => $mmg,
        ]);
    }

    // Recherche par liste Excel
    public function searchExcel(Request $request)
    {
        $msisdns = $request->input('msisdns', []);
        $resultats = [];

        foreach ($msisdns as $msisdn) {
            $occ = DB::table('RA_T_OCC_CDR_DETAIL')
                ->where('A_MSISDN', $msisdn)
                ->count();

            $mmg = DB::table('RA_T_MMG_CDR_DETAIL')
                ->where('A_MSISDN', $msisdn)
                ->count();

            $charge = DB::table('RA_T_OCC_CDR_DETAIL')
                ->where('A_MSISDN', $msisdn)
                ->sum('CHARGE_AMOUNT');

            $resultats[] = [
                'msisdn'   => $msisdn,
                'occ'      => $occ,
                'mmg'      => $mmg,
                'total_dt' => round($charge, 3),
            ];
        }

        return response()->json($resultats);
    }
}