async function fetchdiscounts() {
  const discountTable = document.getElementById("discountTable");
  discountTable.innerHTML = "";

  try {
    const response = await fetch("http://localhost:2000/api/discounts/all");
    const data = await response.json();
    const discounts = data.discounts || [];

    if (discounts.length === 0) {
      discountTable.innerHTML = `<tr><td colspan="4" class="text-center">No discounts found.</td></tr>`;
    } else {
      discounts.forEach((discount, index) => {
        function formatDate(dateString) {
          const date = new Date(dateString);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");

          return `${day}.${month}.${year}  ${hours}:${minutes}`;
        }

        const validF = formatDate(discount.valid_from);
        const validT = formatDate(discount.valid_to);
        discountTable.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>${discount.discount_value}</td>
            <td>${validF}</td>
            <td>${validT}</td>
            <td>${discount.isActive ? "True" : "False"}</td>
            <td style="text-align:center">
            <button class="btn btn-warning btn-sm me-2" 
                    onclick="updatediscount('${discount._id}', 
                    '${discount.discount_value}','${discount.valid_from}','${
          discount.valid_to
        }' )">
              <i class="ti ti-pencil"></i>
            </button>                  
            <button class="btn btn-danger btn-sm me-2" onclick="deletediscount('${
              discount._id
            }')"><i class="ti ti-trash"></i></button>
            </td>
          </tr>`;
      });
    }
  } catch (error) {
    console.error("Error fetching discounts:", error.message);
    Swal.fire({
      title: "Error",
      text: "Failed to fetch discounts. Please try again later.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

async function deletediscount(id) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      const response = await fetch(
        `http://localhost:2000/api/discounts/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete discount with status ${response.status}`
        );
      }

      Swal.fire({
        title: "Deleted!",
        text: "discount has been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });

      fetchdiscounts();
    }
  } catch (error) {
    console.error("Error deleting discount:", error.message);
    Swal.fire({
      title: "Error",
      text: "Failed to delete discount. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

async function updatediscount(
  id,
  currentDiscValue,
  currentValidFrom,
  currentValidTo
) {
  const { value: formValues } = await Swal.fire({
    title: "Update discount",
    html: `
    <div class="swal-input-group">
      <label for="discountValue">Discount Value (%)</label>
      <input type="number" class="form-control swal-input" id="discountValue" value="${currentDiscValue}" name="discountValue" placeholder="Enter discount percentage" min="0" max="100" required>
    </div>
    <br>
    <div class="swal-input-group">
      <label for="validFrom">Valid From</label>
      <input type="datetime-local" id="validFrom" class="form-control swal-input" value="${currentValidFrom}" name="validFrom" >
    </div>
    <br>
    <div class="swal-input-group">
      <label for="validTo">Valid To</label>
      <input type="datetime-local" id="validTo" class="form-control swal-input" value="${currentValidTo}" name="validTo" >
    </div>`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Update",
    preConfirm: () => {
      const discount_value = document.getElementById("discountValue").value;
      const valid_from = document.getElementById("validFrom").value;
      const valid_to = document.getElementById("validTo").value;

      if (!discount_value || !valid_from || !valid_to) {
        Swal.showValidationMessage("Please fill out all fields");
        return null;
      }
      if (new Date(valid_from) > new Date(valid_to)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Dates",
          text: "'Valid From' date cannot be later than 'Valid To' date.",
        });
        return;
      }
      return { discount_value, valid_from, valid_to };
    },
  });

  if (formValues) {
    try {
      const response = await fetch(
        `http://localhost:2000/api/discounts/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Updated!",
          text: "discount has been updated.",
          icon: "success",
        });
        fetchdiscounts();
      } else {
        throw new Error(
          `Failed to update discount with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error updating discount:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update discount. Please try again.",
        icon: "error",
      });
    }
  }
}

async function add() {
  const form = document.getElementById("discountForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const discount_value = document.getElementById("discountValue").value;
    const valid_from = document.getElementById("validFrom").value;
    const valid_to = document.getElementById("validTo").value;

    if (new Date(valid_from) > new Date(valid_to)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Dates",
        text: "'Valid From' date cannot be later than 'Valid To' date.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/api/discounts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ discount_value, valid_from, valid_to }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "discount created",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed to add the discount. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

updatediscount();
deletediscount();
fetchdiscounts();
add();
