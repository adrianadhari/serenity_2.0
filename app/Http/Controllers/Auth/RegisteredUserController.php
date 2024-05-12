<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    private $roleData = ['admin', 'unit'];

    public function index(): Response
    {
        $users = User::latest()->get();
        return Inertia::render('Auth/Index', [
            'users'  => $users
        ]);
    }

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'role'  => $this->roleData
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|lowercase|max:20|unique:' . User::class,
            'role' => ['required', Rule::in($this->roleData)],
        ]);

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'role' => $request->role,
            'password' => Hash::make('password'),
        ]);

        return redirect()->route('user.index')->with('message', 'User Berhasil Dibuat!');
    }

    public function destroy($id): RedirectResponse
    {
        User::findOrFail($id)->delete();
        return back();
    }
}
