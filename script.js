var $filterCheckboxes = $('input[type="checkbox"]');
var filterFunc = function () {
  var selectedFilters = {};

  $filterCheckboxes.filter(":checked").each(function () {
    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $(".location");

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function (name, filterValues) {
    // filter each .flower element
    $filteredResults = $filteredResults.filter(function () {
      var matched = false,
        currentFilterValues = $(this).data("category").split(" ");

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function (_, currentFilterValue) {
        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;
    });
  });

  $(".location").hide().filter($filteredResults).show();
};

$filterCheckboxes.on("change", filterFunc);

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const carousel = document.querySelector(".carousel-container");
const track = document.querySelector(".track");
let width = carousel.offsetWidth;
let index = 0;
window.addEventListener("resize", function () {
  width = carousel.offsetWidth;
});
next.addEventListener("click", function (e) {
  e.preventDefault();
  index = index + 1;
  prev.classList.add("show");
  track.style.transform = "translateX(" + index * -width + "px)";
  if (track.offsetWidth - index * width < index * width) {
    next.classList.add("hide");
  }
});
prev.addEventListener("click", function () {
  index = index - 1;
  next.classList.remove("hide");
  if (index === 0) {
    prev.classList.remove("show");
  }
  track.style.transform = "translateX(" + index * -width + "px)";
});
