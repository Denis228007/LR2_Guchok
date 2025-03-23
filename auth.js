function loginAdmin() {
    const password = document.getElementById("admin-password").value;

    
    if (password === "denis228") {
        document.cookie = "isAdmin=true; path=/; max-age=3600"; 
        alert("Успішний вхід!");
        window.location.href = "admin-panel.html"; 
    } else {
        alert("Невірний пароль!");
    }
}


function checkAdminAccess() {
    if (document.cookie.includes("isAdmin=true")) {
        return true;
    } else {
        alert("Доступ заборонено! Увійдіть як адміністратор.");
        window.location.href = "admin.html"; 
        return false;
    }
}


function logoutAdmin() {
    document.cookie = "isAdmin=; path=/; max-age=0"; 
    alert("Ви вийшли з облікового запису адміністратора.");
    window.location.href = "index.html"; 
}
