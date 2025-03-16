function isTokenExpired(token) {
  const expTime = getTokenExpTime(token);
  return expTime && new Date() >= expTime;
}

async function login() {
  const login = document.getElementById("login");
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "http://3.77.231.30:3000/auth-customer/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log(response.ok);
      console.log(data.message);
      if (!response.ok) {
        Swal.fire({
          title: "",
          text:
            data.message.response.message || "Login failed. Please try again.",
          icon: "error",
        });
        return;
      }
      if (data.accessToken) {
        localStorage.setItem("access_token", data.accessToken);
      }

      login.style.display = "none";

      Swal.fire({
        title: "",
        text: data.message,
        icon: "success",
      }).then(() => {
        window.location.href = "/api";
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to log in. Please check your internet connection and try again.",
        icon: "error",
      });
      console.error("Error during login:", error);
    }
  });
}

async function register() {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

    try {
      console.log(111111);
      const response = await fetch(
        "http://3.77.231.30:3000/auth-customer/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullname, email, password, phone }),
        }
      );
      console.log(222222);
      let data = await response.json();
      console.log("data: ", data);

      if (response.ok) {
        Swal.fire({
          title: "",
          text: data.message, // Muvaffaqiyatli xabarni chiqarish
          icon: "success",
        }).then(() => {
          window.location.href = "/api/register";
        });
      } else {
        Swal.fire({
          title: "",
          text: data.message.response.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Internetga ulanishda xatolik!",
        icon: "error",
      });
      console.error("Error during registration:", error);
    }
  });
}

async function refreshToken() {
  try {
    const response = await fetch("http://3.77.231.30:2000/api/admin/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      console.log("Refresh token failed");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
      return null;
    }

    const data = await response.json();
    if (data.message && data.message == "jwt expired") {
      console.log("Refresh expired");
      window.location.href = "/admin_login";
    }
    document.cookie = `accessToken=${data.accessToken}; path=/; secure; SameSite=Strict`;

    return data.accessToken;
  } catch (error) {
    console.error("Refresh token error: ", error);
    window.location.href = "/login";
  }
}

async function logout() {
  document.getElementById("logout-btn").addEventListener("click", logout);
  try {
    const response = await fetch(
      "http://3.77.231.30:3000/auth-customer/signout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json(); // Backend javobini olish

    if (response.ok) {
      Swal.fire({
        title: "",
        text: data.message,
        icon: "success",
      }).then(() => {
        window.location.href = "/api";
      });
    } else {
      Swal.fire({
        title: "",
        text: data.message || "Logout failed",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
    Swal.fire({
      title: "Error",
      text: "An error occurred while logging out. Please try again.",
      icon: "error",
    });
  }
}

register();
login();
// logout();
// refreshToken()
