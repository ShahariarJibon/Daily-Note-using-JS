const create = document.querySelector(".create");
const cancel = document.querySelector(".can");
const save = document.querySelector(".save");
const noteOverlay = document.querySelector(".note-overlay");
const title = document.querySelector("#title");
const text = document.querySelector("#textArea");
const notesContainer = document.querySelector(".notes");
const readOverlay = document.querySelector(".read-overlay");
const readCard = document.querySelector(".read-card");
const writtenTitle = document.querySelector(".written-title");
const description = document.querySelector(".description");
const close = document.querySelector(".close");
const edit = document.querySelector(".edit");
const del = document.querySelector(".delete");
const star = document.querySelector(".star");
const favourite = document.querySelector(".favourite");
const done = document.querySelector(".done");
const completed = document.querySelector(".completed");
const darkBtn = document.querySelector(".dark");
const searchBox = document.querySelector(".search");
const colorOptions = document.querySelectorAll(".color li");
const noteModalDiv = document.querySelector(".note-modal");
const pin = document.querySelector(".pin");
const filterDropdown = document.querySelector(".search-wrapper .category-dropdown");
const filterToggle = filterDropdown.querySelector(".category-toggle");
const filterSelected = filterDropdown.querySelector(".category-selected");
const filterOptions = filterDropdown.querySelectorAll(".category-option");
const noteCategoryDropdown = document.querySelector("#noteCategoryDropdown");
const noteCategoryToggle = noteCategoryDropdown.querySelector(".category-toggle");
const noteCategorySelected = noteCategoryDropdown.querySelector(".category-selected");
const noteCategoryOptions = noteCategoryDropdown.querySelectorAll(".category-option");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let selectedNodeId = null;
let isShowingFavourites = false;
let isShowingCompleted = false;
let isPinned = false;

let selectedColor = "";
let currentFilterCategory = "all";


colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    colorOptions.forEach((c) => c.classList.remove("selected"));
    option.classList.add("selected");

    selectedColor = option.textContent;
    noteModalDiv.style.backgroundColor = selectedColor;

    console.log(selectedColor);


    if (selectedNodeId !== null) {
      const selectedNote = notes.find((note) => note.id === selectedNodeId);

      if (selectedNote) {
        selectedNote.color = selectedColor;

        const noteCard = document.querySelector(`.note[data-id="${selectedNodeId}"]`);
        if (noteCard) {
          noteCard.style.backgroundColor = selectedColor;
        }

        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }
  });
});

create.addEventListener("click", () => {
  selectedNodeId = null;
  title.value = "";
  text.value = "";
  selectedColor = "";
  noteModalDiv.style.backgroundColor = "";
  colorOptions.forEach((c) => c.classList.remove("selected"));
  filterDropdown.classList.remove("active");
  noteCategoryDropdown.classList.remove("active");
  noteOverlay.style.display = "flex";
  console.log("create clicked");
});

cancel.addEventListener("click", () => {
  selectedNodeId = null;
  title.value = "";
  text.value = "";
  selectedColor = "";
  noteModalDiv.style.backgroundColor = "";
  colorOptions.forEach((c) => c.classList.remove("selected"));
  noteOverlay.style.display = "none";
});

save.addEventListener("click", () => {
  const titleValue = title.value.trim();
  const textValue = text.value.trim();

  if (!titleValue && !textValue) return;

  const note = {
    id: Date.now(),
    title: titleValue,
    content: textValue,
    starred: false,
    completed: false,
    color: selectedColor,
    pinned: false,
    category: (currentFilterCategory && currentFilterCategory !== "all") ? currentFilterCategory : "",
  };

  if (selectedNodeId != null) {
    const selectedNote = notes.find((note) => note.id === selectedNodeId);

    selectedNote.title = titleValue;
    selectedNote.content = textValue;

    localStorage.setItem("notes", JSON.stringify(notes));
    placeNote();

    selectedNodeId = null;
  } else {
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    placeNote();
  }
  title.value = "";
  text.value = "";
  selectedColor = "";
  noteModalDiv.style.backgroundColor = "";
  colorOptions.forEach((c) => c.classList.remove("selected"));
  noteOverlay.style.display = "none";

  console.log("save clicked");
});

function placeNote() {
  notesContainer.innerHTML = "";

  let notesToDisplay = notes;


  if (isShowingFavourites) {
    notesToDisplay = notes.filter(note => note.starred === true);
  } else if (isShowingCompleted) {
    notesToDisplay = notes.filter(note => note.completed === true);
  }

  if (currentFilterCategory && currentFilterCategory !== "all") {
    notesToDisplay = notesToDisplay.filter(note => note.category && note.category.toLowerCase() === currentFilterCategory.toLowerCase());
  }


  const searchValue = searchBox.value ? searchBox.value.trim().toLowerCase() : "";

  if (searchValue) {
    notesToDisplay = notesToDisplay.filter(note => note.title.toLowerCase().includes(searchValue) || note.content.toLowerCase().includes(searchValue));
  }



  notesToDisplay.forEach((note) => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");
    noteEl.dataset.id = note.id;
    if (note.color) {
      noteEl.style.backgroundColor = note.color;
    }

    noteEl.innerHTML = `
  <div class="note-header">
  <div class="note-header-title">
    
    <h3>${note.title}</h3>
    </div>

    <div class="star-box">
    ${note.pinned
        ? `<i class="fa fa-thumb-tack"
         style="margin:10px; font-size:25px; cursor:pointer; color:#BC0202"></i>`
        : ""}
    ${note.starred ? `<i class="fa fa-star starred" style="margin:10px; font-size:30px; color:#FFD444"></i>` : ""}
      <input type="checkbox" class="note-checkbox" data-id="${note.id}"
      style="width: 20px; height: 20px; cursor: pointer; ">
  </div>
  </div>
  <p>${note.content}</p>
`;
    const checkbox = noteEl.querySelector(".note-checkbox");

    checkbox.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    noteEl.addEventListener("click", (e) => {
      if (e.target.type === "checkbox") return;
      const id = Number(noteEl.dataset.id);

      const selectedNote = notes.find((note) => note.id === id);

      selectedNodeId = id;

      writtenTitle.textContent = selectedNote.title;
      description.textContent = selectedNote.content;
      readCard.style.backgroundColor = selectedNote.color ? selectedNote.color : "";

      if (selectedNote.category) {
        const matchingOption = Array.from(noteCategoryOptions).find(
          (opt) => opt.dataset.value.toLowerCase() === selectedNote.category.toLowerCase()
        );
        if (matchingOption) {
          noteCategorySelected.textContent = matchingOption.textContent.trim();
          noteCategoryOptions.forEach((opt) => opt.classList.remove("selected"));
          matchingOption.classList.add("selected");
        } else {
          noteCategorySelected.textContent = selectedNote.category;
          noteCategoryOptions.forEach((opt) => opt.classList.remove("selected"));
        }
      } else {
        noteCategorySelected.textContent = "Category";
        noteCategoryOptions.forEach((opt) => opt.classList.remove("selected"));
      }

      filterDropdown.classList.remove("active");
      noteCategoryDropdown.classList.remove("active");
      readOverlay.style.display = "flex";
    });
    notesContainer.appendChild(noteEl);
  });
}



placeNote();



close.addEventListener("click", () => {
  readOverlay.style.display = "none";
  noteCategoryDropdown.classList.remove("active");
  selectedNodeId = null;
});

edit.addEventListener("click", () => {
  const selectedNote = notes.find((note) => note.id === selectedNodeId);
  if (!selectedNote) return;

  title.value = selectedNote.title;
  text.value = selectedNote.content;
  selectedColor = selectedNote.color || "";
  noteModalDiv.style.backgroundColor = selectedColor;
  colorOptions.forEach((c) => {
    if (selectedColor && c.textContent.trim() === selectedColor.trim()) {
      c.classList.add("selected");
    } else {
      c.classList.remove("selected");
    }
  });

  filterDropdown.classList.remove("active");
  noteCategoryDropdown.classList.remove("active");
  noteOverlay.style.display = "flex";
  readOverlay.style.display = "none";
});

del.addEventListener("click", () => {
  const checkedBoxes = document.querySelectorAll(".note-checkbox:checked");

  checkedBoxes.forEach((checkbox) => {
    const id = Number(checkbox.dataset.id);

    notes = notes.filter((note) => note.id !== id);
  });

  localStorage.setItem("notes", JSON.stringify(notes));

  placeNote();

  readOverlay.style.display = "none";
});

star.addEventListener("click", () => {
  const selectedNote = notes.find((note) => note.id === selectedNodeId);
  selectedNote.starred = !selectedNote.starred;

  localStorage.setItem("notes", JSON.stringify(notes));

  placeNote();
});

done.addEventListener("click", () => {
  const checkedBoxes = document.querySelectorAll(".note-checkbox:checked");

  checkedBoxes.forEach((checkbox) => {
    const id = Number(checkbox.dataset.id);
    const selectedNote = notes.find((note) => note.id === id);
    if (selectedNote) {
      selectedNote.completed = true;
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes));
  placeNote();
});

completed.addEventListener("click", () => {
  isShowingCompleted = !isShowingCompleted;
  isShowingFavourites = false;

  if (isShowingCompleted) {
    completed.textContent = "All Notes";
    favourite.textContent = "Favourites";
  } else {
    completed.textContent = "Completed";
  }

  placeNote();
});

favourite.addEventListener("click", () => {
  isShowingFavourites = !isShowingFavourites;
  isShowingCompleted = false;

  if (isShowingFavourites) {
    favourite.textContent = "All Notes";
    completed.textContent = "Completed";
  } else {
    favourite.textContent = "Favourites";
  }

  placeNote();
});

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  document.note.p.color = selectedColor;

  const icon = darkBtn.querySelector("i");

  icon.classList.remove("swipe-in");
  icon.classList.add("swipe-oout");
  setTimeout(() => {
    if (document.body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-moon-o");
      icon.classList.add("fa-sun-o");
    } else {
      icon.classList.remove("fa-sun-o");
      icon.classList.add("fa-moon-o");
    }

    icon.classList.remove("swipe-oout");
    icon.classList.add("swipe-in");

  }, 300);


});

searchBox.addEventListener("input", () => {
  placeNote();
});


pin.addEventListener("click", () => {
  const selectedNote = notes.find(
    (note) => note.id === selectedNodeId
  );

  if (!selectedNote) return;

  selectedNote.pinned = !selectedNote.pinned;

  notes = notes.filter(
    (note) => note.id !== selectedNote.id
  );


  if (selectedNote.pinned) {
    notes.unshift(selectedNote);
  } else {
    notes.push(selectedNote);
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  placeNote();
});


// Filter beside search bar
filterToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  noteCategoryDropdown.classList.remove("active");
  filterDropdown.classList.toggle("active");
});

filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    currentFilterCategory = option.dataset.value;
    filterSelected.textContent = option.textContent.trim();

    filterOptions.forEach((item) => {
      item.classList.remove("selected");
    });
    option.classList.add("selected");

    filterDropdown.classList.remove("active");
    placeNote();
  });
});

// Category on note (read card)
noteCategoryToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  filterDropdown.classList.remove("active");
  noteCategoryDropdown.classList.toggle("active");
});

noteCategoryOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const chosenCategory = option.dataset.value;
    noteCategorySelected.textContent = option.textContent.trim();

    noteCategoryOptions.forEach((item) => {
      item.classList.remove("selected");
    });
    option.classList.add("selected");

    noteCategoryDropdown.classList.remove("active");

    if (selectedNodeId !== null) {
      const selectedNote = notes.find((note) => note.id === selectedNodeId);
      if (selectedNote) {
        selectedNote.category = chosenCategory;
        localStorage.setItem("notes", JSON.stringify(notes));
        placeNote();
      }
    }
  });
});

document.addEventListener("click", () => {
  filterDropdown.classList.remove("active");
  noteCategoryDropdown.classList.remove("active");
});