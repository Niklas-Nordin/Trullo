"use client";

function login() {
  return (
    <div>
        <h1>Sign in</h1>

        <form>
            <label htmlFor="EmailUsername:">Email or Username:</label>
            <input type="text" id="EmailUsername" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
        </form>
    </div>
  );
}

export default login;
