<template>
    <div>
        <h1>Login</h1>
        <form action="" class="flex flex-col ">
            <label for="username">User Name:</label>
            <input type="text" id="username" class="bg-slate-200">
            <label for="password">Password:</label>
            <input type="password" class="bg-slate-200 mb-1">   
            <Btn /> 
        </form>
     
        <p class="mt-5">If you do not have an account, register here:</p>
        <h1>Create Account</h1>
        <form action="" class="flex flex-col ">
            <label for="username">User Name:</label>
            <input type="text" id="username" class="bg-slate-200">
            <label for="email">Email:</label>
            <input type="email" class="bg-slate-200">
            <label for="password">Password:</label>
            <input type="password" class="bg-slate-200 mb-1">   
            <Btn />   
        </form>

    </div>
</template>