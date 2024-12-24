document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".btnClk").addEventListener("click", function (event) {
    event.preventDefault();
    calcIT();
  });

  const bill = document.getElementById("bill") as HTMLInputElement;
  const cnt = document.getElementById("count") as HTMLInputElement;
  const svc = document.getElementById("service") as HTMLSelectElement;

  const sumBill = document.querySelector(".tip");
  const sumTip = document.querySelector(".alles");
  const sum = document.querySelector(".sum");

  function calcIT() {
    const billNr = bill.valueAsNumber;
    const cntNr = cnt.valueAsNumber;
    const service = Number(svc.value);

    const res = billNr;
    const resTip = billNr * (service / 100);
    const resDiv = (billNr / cntNr) * (service / 100 + 1);

    if (sumTip !== null)
      sumTip.textContent = `Gesamtbetrag: ${resTip.toFixed(2)} €`;
    if (sum !== null) sum.textContent = `Pro Person: ${resDiv.toFixed(2)} €`;
    if (sumBill !== null)
      sumBill.textContent = `Trinkgeld: ${res.toFixed(2)} €`;
  }

  const canvas = document.getElementById("gameCanvas");
  if (canvas != null) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else return;

  const ctx = canvas.getContext("2d");

  class Ball {
    x: any;
    y: any;
    dx: any;
    dy: any;
    radius: any;
    color: any;
    constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.draw();
    }
  }

  let balls = [];

  function createBall() {
    const radius = Math.random() * 20 + 10;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 20;
    const dy = (Math.random() - 0.5) * 20;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;

    balls.push(new Ball(x, y, dx, dy, radius, color));
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach((ball) => ball.update());
  }

  animate();

  // Event-Listener für die Enter-Taste
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      createBall();
    }
  });

  // Anpassung der Canvas-Größe bei Fenstergrößenänderung
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
