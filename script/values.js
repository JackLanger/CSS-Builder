var box = document.querySelector(".box");
var ranges = document.querySelectorAll(".spread_range");
var inputs = document.querySelectorAll(".spread_in");

window.addEventListener("load", () => {
  ranges.forEach((elem) => (elem.value = elem.name == "opacity" ? 100 : 0));
  inputs.forEach((elem) => (elem.value = elem.id == "opacity" ? 1 : 0));
  inputs.forEach((elem) =>


  /******************************************
   * controll keyinputs, numeric validation *
   *****************************************/
    elem.addEventListener("focus", () => {
      elem.addEventListener("keydown", (event) => {
        let key = event.which || event.keyCode;
        if (key < 95 || key > 105 ) {
            if(key >57 || key <48 ){
                event.preventDefault();
            }

        }
        if (key == 13) {
          document.querySelector(":focus").blur();
        }
      });

      let old = elem.value;
      elem.value = "";

      elem.addEventListener("focusout", () => {
        console.log(elem.value, old);
        if (elem.value == "") {
          elem.value = old;
        }
      });
    })
  );
});

inputs.forEach((elem) =>
  elem.addEventListener("input", () => {
    /*****************************
     * prevent input of nonumbers*
     *****************************/

    let max = 100;
    /*********************
     * cap the max values*
     *********************/
    switch (elem.id) {
      case "red":
        max = 255;
        break;
      case "green":
        max = 255;
        break;
      case "blue":
        max = 255;
        break;
      case "opacity":
        max = 1;
        break;
      default:
        max = 100;
        break;
    }
    elem.value = elem.value > max ? max : elem.value;

    var arr = [];
    ranges.forEach((elem) => arr.push(elem));

    arr.find((r) => r.name == elem.id).value =
      elem.id == "opacity" ? elem.value * 100 : elem.value;
    shadow();
  })
);

ranges.forEach((elem) =>
  elem.addEventListener("mousedown", () => {
    window.addEventListener("mousemove", resetValue);
    window.addEventListener("mouseup", mouseUp);

    function resetValue() {
      if (elem.name == "opacity") {
        document.querySelector("#" + elem.name + "").value = elem.value / 100;
      } else {
        document.querySelector("#" + elem.name + "").value = elem.value;
      }

      let obj = shadow();

      document.querySelector(".info").innerHTML =
        "box-shadow: " +
        obj.x +
        "px " +
        obj.y +
        "px " +
        obj.blur +
        "px " +
        obj.spread +
        "px " +
        "rgba(" +
        obj.red +
        "," +
        obj.green +
        "," +
        obj.blue +
        "," +
        obj.opacity +
        ")";
    }

    function mouseUp() {
      window.removeEventListener("mousemove", resetValue);
      window.removeEventListener("mouseup", mouseUp);
    }
  })
);

function shadow() {
  let x = inputs[0].value;
  let y = inputs[1].value;
  let blur = inputs[2].value;
  let spread = inputs[3].value;
  var obj = {
    x: x,
    y: y,
    blur: blur,
    spread: spread,
    red: inputs[4].value,
    green: inputs[5].value,
    blue: inputs[6].value,
    opacity: inputs[7].value,
  };

  box.style.boxShadow =
    obj.x +
    "px " +
    obj.y +
    "px " +
    obj.blur +
    "px " +
    obj.spread +
    "px " +
    "rgba(" +
    obj.red +
    "," +
    obj.green +
    "," +
    obj.blue +
    "," +
    obj.opacity +
    ")";
  return obj;
}
