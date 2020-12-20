var box = document.querySelector(".box");
var resizer = document.querySelector(".resizer");

var left_s = box.getBoundingClientRect().left;
var top_s = box.getBoundingClientRect().top;

window.addEventListener("load", () => {
  document.getElementById("boxinfo").innerHTML =
                                                "width: " +
                                                Math.ceil(left_s) +
                                                "px, " +
                                                "height: " +
                                                Math.ceil(top_s) +
                                                "px";

  let p = document.getElementById("box_position");
  p.innerHTML =
                "position:absolute; left:" +
                Math.ceil(box.getBoundingClientRect().left) +
                "; top:" +
                Math.ceil(box.getBoundingClientRect().top) +
                ";";
});
/**
 * resize by drag and drop
 */
resizer.addEventListener("mousedown", mousedown);

function mousedown() {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  function mousemove(e) {
    e.preventDefault();

    let pos = {
      x: e.clientX || e.pageX,
      y: e.clientY || e.pageY,
    };

    let boxRec = box.getBoundingClientRect();

    let size = {
      width: 0,
      height: 0,
    };
/**
 * if size is smaller than 0 set to 0 else keep size
 */
    size.width = ((boxRec.left - pos.x) * -1 > 0) ? (boxRec.left - pos.x) * -1 : 0;
    size.height = ((boxRec.top - pos.y) * -1 > 0) ? (boxRec.top - pos.y) * -1 : 0;

    box.style.width = size.width + "px";
    box.style.height = size.height + "px";

    document.getElementById("boxinfo").innerHTML =
      "width: " +
      Math.ceil(size.width) +
      "px, " +
      "height: " +
      Math.ceil(size.height) +
      "px";
  }
//unsubscribe
  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
}
/**
 * drag and drop for reposition
 */
document.querySelector(".dragarea").addEventListener("mousedown", (e) => {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let boxRect = box.getBoundingClientRect();

  let left = boxRect.left;
  let top = boxRect.top;

  offset = {
    x: left - e.clientX,
    y: top - e.clientY,
  };

  function mousemove(e) {
    let pos = {
      x: e.clientX || e.pageX,
      y: e.clientY || e.pageY,
    };
    
    left_s = pos.x + offset.x;
    top_s = pos.y + offset.y;

    box.style.left = left_s + "px";
    box.style.top = top_s + "px";
//reset values of paragraph
    document.getElementById('box_position').innerHTML =
                "position:absolute; left:" +
                Math.ceil(box.getBoundingClientRect().left) +
                "; top:" +
                Math.ceil(box.getBoundingClientRect().top) +
                ";";
  }

  function mouseup() {
    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }
});
