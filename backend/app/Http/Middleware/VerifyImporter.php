<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyImporter
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = auth('api')->user();
            if (in_array($user->rol, ['ADMIN', 'IMPORTER'])) {
                return $next($request);
            } else {
                return response()->json(['statusCode' => 403], 403);
            }
        } catch (\Exception $e) {
            return response()->json(['statusCode' => 403], 403);
        }
    }
}
