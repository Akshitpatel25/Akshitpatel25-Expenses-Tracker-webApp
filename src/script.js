document.addEventListener("DOMContentLoaded", function () {
  const expense_addbtn = document.querySelector(".expense_addbtn");
  const expense_name = document.querySelector(".expense_name");
  const expense_price = document.querySelector(".expense_price");
  const expense_tracker = document.querySelector(".expense_tracker");
  const total_price = document.querySelector(".total_price");
  let total = 0;

  let expenses_array = JSON.parse(localStorage.getItem("expenses_array")) || [];

  expense_addbtn.addEventListener("click", function () {
    let name = expense_name.value.trim();
    let price = expense_price.value.trim();

    if (name === "" || price === "") return;

    let new_expense = {
      expenses_id: Date.now(),
      expenses_name: name,
      expenses_price: price,
    };

    // making input value empty
    expense_name.value = "";
    expense_price.value = "";

    // pushing new_expense to expense_array;
    expenses_array.push(new_expense);
    console.log(expenses_array);
    save_localStorage();
    window.location.reload();
  });

  //   expense_tracker
  function expense_tracker_fn() {
    for (let i = 0; i < expenses_array.length; i++) {
      //   console.log(expenses_array[i]);

      // creating element using DOM
      let box = document.createElement("div");
      // box.style.border = '1px solid red';
      box.style.display = "flex";
      box.style.justifyContent = "space-between";
      box.style.alignItems = "center";

      let h3 = document.createElement("h3");
      h3.textContent = `${expenses_array[i].expenses_name} - ₹ ${expenses_array[i].expenses_price}`;
      h3.style.color = "#fde047";
      h3.style.fontSize = "18px";

      let del_btn = document.createElement("button");
      del_btn.textContent = "DEL";
      del_btn.style.backgroundColor = "#fde047";
      del_btn.style.padding = "2px 10px 2px 10px";
      del_btn.style.borderRadius = "3px";

      // deleting expenses from expenses_array
      del_btn.addEventListener("click", function () {
        // console.log(expenses_array[i].expenses_id);
        expenses_array = expenses_array.filter(
          (item) => item.expenses_id != expenses_array[i].expenses_id
        );
        save_localStorage();
        window.location.reload();
      });

      //   appending child
      box.appendChild(h3);
      box.appendChild(del_btn);
      expense_tracker.appendChild(box);
    }
  }

  //   Calculating total
  for (let i = 0; i < expenses_array.length; i++) {
    total += Number(expenses_array[i].expenses_price);
    total_price.textContent = total;
    // console.log(total);
  }

  //   saving array to local Storage
  function save_localStorage() {
    localStorage.setItem("expenses_array", JSON.stringify(expenses_array));
  }

  //   calling functions!
  expense_tracker_fn();
});
