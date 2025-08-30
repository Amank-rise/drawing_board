window.addEventListener("load", () => {
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");

      canvas.height = window.innerHeight - 80; // space for toolbar
      canvas.width = window.innerWidth - 20;

      let painting = false;

      function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        if (e.touches) { // touch support
          return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
          };
        } else {
          return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          };
        }
      }

      function startPosition(e) {
        painting = true;
        ctx.beginPath(); // start a new path every time mouse is pressed
        const {x, y} = getCoords(e);
        ctx.moveTo(x, y); // move to the starting point
      }

      function finishedPosition() {
        painting = false;
      }

      function draw(e) {
        if (!painting) return;
        const {x, y} = getCoords(e);
        ctx.lineWidth = document.getElementById("brushSize").value;
        ctx.lineCap = "round";
        ctx.strokeStyle = document.getElementById("colorPicker").value;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.moveTo(x, y); // set start point for next segment
      }

      // Mouse events
      canvas.addEventListener('mousedown', startPosition);
      canvas.addEventListener('mouseup', finishedPosition);
      canvas.addEventListener('mousemove', draw);

      // Touch events
      canvas.addEventListener('touchstart', startPosition);
      canvas.addEventListener('touchend', finishedPosition);
      canvas.addEventListener('touchmove', draw);

      // Clear canvas
      document.getElementById("clear").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      });
      // Save drawing
    //   document.getElementById("save").addEventListener("click", () => {
    //     const link = document.createElement("a");
    //     link.download = "drawing.png";
    //     link.href = canvas.toDataURL("image/png");
    //     link.click();
    //   });

    });
