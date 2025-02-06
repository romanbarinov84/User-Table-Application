///////////////////////Data Base///////////////////////////////////////
let listData = [
  {
    name: "Oleg",
    sureName: "Ivanovich",
    lastName: "Mostkevich",
    age: 45,
    hobby: "Music",
  },
  {
    name: "Niko",
    sureName: "Romanovich",
    lastName: "Belick",
    age: 55,
    hobby: "Crime",
  },
  {
    name: "Alex",
    sureName: "Andreevich",
    lastName: "Bobko",
    age: 67,
    hobby: "rieltor",
  },
  {
    name: "Bogdan",
    sureName: "Denisovich",
    lastName: "Devito",
    age: 38,
    hobby: "Carserver",
  },
];

//////////////////////////Create Element//////////////////////////////////////////

let sortColumnFlag = "fio";

const $app = document.getElementById("app"),
  $addForm = document.getElementById("add-form"),
  $nameInput = document.getElementById("add-form__name-input"),
  $sureNameInput = document.getElementById("add-form__sureName-input"),
  $lastNameInput = document.getElementById("add-form__lastName-input"),
  $ageInput = document.getElementById("add-form__age-input"),
  $hobbyInput = document.getElementById("add-form__hobby-input"),
  $sortFio = document.getElementById("sort__fio"),
  $sortAge = document.getElementById("sort__age"),
  $filterNameInput = document.getElementById("filter__name-input"),
  $table = document.createElement("table"),
  $tableHead = document.createElement("thead"),
  $tableBody = document.createElement("tbody"),
  $tableHeadTr = document.createElement("tr"),
  $tableHeadThFIO = document.createElement("th"),
  $tableHeadThAGE = document.createElement("th"),
  $tableHeadThBirthYear = document.createElement("th"),
  $tableHeadThHobby = document.createElement("th");

($tableHeadThFIO.textContent = "Name"),
  ($tableHeadThAGE.textContent = "Age"),
  ($tableHeadThBirthYear.textContent = "BirthYear"),
  ($tableHeadThHobby.textContent = "Hobby");

$tableHeadTr.append($tableHeadThFIO),
  $tableHeadTr.append($tableHeadThAGE),
  $tableHeadTr.append($tableHeadThBirthYear),
  $tableHeadTr.append($tableHeadThHobby),
  $tableHead.append($tableHeadTr);
$table.append($tableHead);
$table.append($tableBody);
$app.append($table);

/////////////////////////////////////ADD CLASESS//////////////////////////////////////////////////

//////////////////////////Render///////////////////////////////////////////////

function createUserTr(oneUser) {
  const $userTr = document.createElement("tr"),
    $userFIO = document.createElement("th"),
    $userAGE = document.createElement("th"),
    $userBirthYear = document.createElement("th"),
    $userHobby = document.createElement("th");

  ($userFIO.textContent = oneUser.fio),
    ($userAGE.textContent = oneUser.age),
    ($userBirthYear.textContent = oneUser.birthYear),
    ($userHobby.textContent = oneUser.hobby);

  $userTr.append($userFIO);
  $userTr.append($userAGE);
  $userTr.append($userBirthYear);
  $userTr.append($userHobby);

  return $userTr;
}

function render(arrData) {
  $tableBody.innerHTML = " ";
  let copyListData = [...arrData];

  // Добавление вычисляемых свойств
  for (const oneUser of copyListData) {
    oneUser.fio =
      oneUser.name + " " + oneUser.sureName + " " + oneUser.lastName;
    oneUser.birthYear = new Date().getFullYear() - oneUser.age;
  }

  // Фильтрация
  if ($filterNameInput.value.trim() !== "") {
    copyListData = copyListData.filter(function (oneUser) {
      return oneUser.fio.toLowerCase().includes($filterNameInput.value.trim().toLowerCase());
    });
  }

  // Сортировка
  copyListData = copyListData.sort(function (a, b) {
    if (sortColumnFlag === "fio") {
      if (a.fio < b.fio) return -1;
      if (a.fio > b.fio) return 1;
      return 0;
    } else if (sortColumnFlag === "age") {
      return a.age - b.age;
    }
    return 0;
  });

  // Рендеринг данных в таблицу
  for (const oneUser of copyListData) {
    const $newTr = createUserTr(oneUser);
    $tableBody.append($newTr);
  }
}

render(listData);

$addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if ($ageInput.value.trim() == "") {
    alert("Age is not defined, please enter your age!!!");
    return;
  }
  if ($nameInput.value.trim() == "") {
    alert("Name is not defined, please enter your name!!!");
    return;
  }
  if ($sureNameInput.value.trim() == "") {
    alert("Surename is not defined, please enter your surename!!!");
    return;
  }
  if ($lastNameInput.value.trim() == "") {
    alert("Lastname is not defined, please enter your lastname!!!");
    return;
  }

  listData.push({
    name: $nameInput.value.trim(),
    sureName: $sureNameInput.value.trim(),
    lastName: $lastNameInput.value.trim(),
    age: Number($ageInput.value.trim()), // Преобразуем в число
    hobby: $hobbyInput.value.trim(),
  });

  render(listData);
});

/////////////////////////////////////// SORT FILTER////////////////////////////////////////////////

$sortFio.addEventListener("click", function () {
  sortColumnFlag = "fio";
  render(listData);
});

$sortAge.addEventListener("click", function () {
  sortColumnFlag = "age";
  render(listData);
});

$filterNameInput.addEventListener("input", function () {
  render(listData);
});
