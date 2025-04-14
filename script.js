let player;
let sonidoActivo = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-background', {
    videoId: 'pbhs9gFLp1Q',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'pbhs9gFLp1Q',
      controls: 0,
      mute: 1,
      showinfo: 0,
      modestbranding: 1,
      rel: 0
    },
    events: {
      onReady: (event) => event.target.playVideo()
    }
  });
}

document.getElementById('activarSonido').addEventListener('click', () => {
  if (player) {
    if (!sonidoActivo) {
      player.unMute();
      player.setVolume(8);
      document.getElementById('activarSonido').innerText = "🔇 Silenciar";
      sonidoActivo = true;
    } else {
      player.mute();
      document.getElementById('activarSonido').innerText = "🎶 Activar música";
      sonidoActivo = false;
    }
  }
});

document.getElementById('startBtn').addEventListener('click', () => {
  document.querySelector('.intro').style.display = 'none';
  document.getElementById('menuSecciones').style.display = 'block';
});

function mostrarSeccion(id) {
  const secciones = ['historia', 'videos', 'canciones', 'cositas'];
  secciones.forEach(sec => {
    document.getElementById(sec).style.display = (sec === id) ? 'block' : 'none';
  });
}

// --- Nuestra historia ---
const capitulos = [
  {
    texto: "Te conocí cuando apenas era este morrillo. ¿Quién iba a imaginar que a esa edad, todo pndjo, conocería a la persona que marcaría el resto de su efímera vida? Gracias por confiar ciegamente en mí.❤️",
    imagenes: ["imagenes/yorisecu.jpg", "imagenes/yorisecu2.jpg"]
  },
  {
    texto: "Todo comenzó un 17 de agosto del 2018... en Roblox. Había conocido a Val y weno ya sabes q pasó xd, pero sin saberlo, ese día también conocí a la persona que marcaría mi vida para siempre: Tú.❤️",
    imagenes: ["imagenes/juntitos1.jpg"]
  },
  {
    texto: "¿Te acuerdas cuando jugábamos al Royale High? Solo hablábamos, sin hacer mucho, pero en ese lugar nos conocimos más que nunca. Llegaba de la escuela y tú siempre estabas ahí, esperándome. Lista para que hablaramos sobre cualquier cosa :3❤️",
    imagenes: ["imagenes/devorando.jpg"]
  },
  {
    texto: "Jajaja el día que te tragaste tremendo ntr😹😹👻. Todo actuado obvio, pero qué risa nos dio ese rato JAJA.❤️ (Qué está pasando aqui🗣️🗣️)",
    imagenes: ["imagenes/ntr.jpg"]
  },
  {
    texto: "Eras tan random y tan tú. Gracias por todos esos momentos raros pero únicos.❤️",
    imagenes: ["imagenes/pedita.jpg"]
  },
  {
    texto: "Cuando alcancé los 10M en el juego ese de ninjas... tú siempre me apoyaste incondicionalmente, incluso cuando mis metas tardaban años.❤️",
    imagenes: ["imagenes/10mnin.jpg"]
  },
  {
    texto: "Cuando conseguí el torpedo oguo. Siempre estuviste conmigo en todos mis logros, por más mínimos o absurdos que fueran. Gracias por eso.❤️",
    imagenes: ["imagenes/torpedo.jpg"]
  },
  {
    texto: "Mira esas vibes: niña de casita, tierna, preciosa. Nunca cambiaste, sigues siendo esa bb de siempre.❤️",
    imagenes: ["imagenes/ali1.jpg", "imagenes/ali2.jpg", "imagenes/ali3.jpg"]
  },
  {
    texto: "“Te amo pero como amics” — así empezó todo. Me rechazaste, pero aún así el amor se nos escapaba en cada palabra.❤️",
    imagenes: ["imagenes/teamoamics.jpg"]
  },
  {
    texto: "Cuando por fin te quitaste los filtros... me enamoré más. Tus lentes, tu boquita, tus ojitos, tus cejas... simplemente tú.❤️",
    imagenes: ["imagenes/novia1.jpg", "imagenes/novia2.jpg"]
  },
  {
    texto: "Recuerdo nuestra casita en Minecraft. Tú construías palacios mientras yo me perdía en las minas. Teníamos hasta nuestros hijitos virtuales.❤️",
    imagenes: ["imagenes/minecraft.jpg", "imagenes/ropa1.jpg", "imagenes/ropa2.jpg"]
  },
  {
    texto: "El día del paro en el Tec. Me apoyaste aunque al inicio no estabas de acuerdo. Siempre estuviste para mí, incluso en mis locuras.❤️",
    imagenes: ["imagenes/paro.jpg"]
  },
  {
    texto: "¿Te acuerdas de esto? Solo tú me pedirías algo así, y solo yo te lo mandaría con tanto amor. Nadie más haría eso por ti 😂 También ese día mojaste la cama xdd. Pero fuera de eso... eras tan tú, tan linda, tan sensual y tan mía. También amo esa parte tuya.❤️",
    imagenes: ["imagenes/mecorazon.jpg", "imagenes/mojada.jpg"]
  },
  {
    texto: "Tus dibujos siempre me hacían sentir mal por los contrastes a los q te mandaba yo xdd. Aun así, los guardaba como tesoros. Me hacías sentir especial.❤️",
    imagenes: ["imagenes/noteit.jpg"]
  },
  {
    texto: "Tus ttas eran arte JAJA. Pero más allá de eso, ver cómo me mirabas mientras las mostrabas... eso me volvía loco.❤️",
    imagenes: ["imagenes/tetas.jpg"]
  },
  {
    texto: "No importa el tiempo que pase, ni las vueltas que de la vida, ni la respuesta que me des hoy o mañana... Yo siempre estaré para ti, apoyándote en cada cosa que emprendas. Me encanta que sigas evolucionando como mujer y como persona, cada día aprendiendo algo nuevo y queriéndote superar más y más, incluso si parte del proceso es ya no tenerte a mi lado, lo entenderé y pues te desearé siempre lo mejor❤️. Oye por cierto... ¿Por qué aún con cada día que pasa, sigues poniéndote más hermosa que el anterior?❤️",
    imagenes: ["imagenes/alinueva1.jpg", "imagenes/alinueva2.jpg", "imagenes/alinueva3.jpg", "imagenes/alinueva4.jpg"]
  },
  {
    texto: "Al menos aquí... sí pudimos estar juntos. Quizá en esta realidad dibujada por mis recuerdos, los dos nos encontramos como siempre soñé: frente a frente, con el tiempo detenido y sin miedo a perdernos. Aunque sea en una imagen inventada, eres tú. Siempre has sido tú. Y si pudiera pedirle algo al destino, sería que un día, esa escena deje de ser imaginación… y se convierta en nuestra realidad. Porque yo aún quiero vivirla contigo.❤️",
    imagenes: ["imagenes/nostalgia.jpg"]
  }
];

let capActual = 0;
const totalCaps = capitulos.length;

function mostrarCapitulo(index) {
  const contenido = document.getElementById("capitulo-contenido");
  contenido.innerHTML = "";

  const cap = capitulos[index];
  const texto = document.createElement("p");
  texto.innerText = cap.texto;
  contenido.appendChild(texto);

  cap.imagenes.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    contenido.appendChild(img);
  });

  document.getElementById("contadorCapitulo").innerText = `Capítulo ${index + 1}/${totalCaps}`;
  contenido.classList.remove("fade");
  void contenido.offsetWidth;
  contenido.classList.add("fade");

  const btnAnterior = document.getElementById("anteriorCap");
  const btnSiguiente = document.getElementById("siguienteCap");

  btnAnterior.disabled = index === 0;
  btnSiguiente.disabled = index === totalCaps - 1;
}

document.getElementById("anteriorCap").addEventListener("click", () => {
  if (capActual > 0) {
    capActual--;
    mostrarCapitulo(capActual);
  }
});

document.getElementById("siguienteCap").addEventListener("click", () => {
  if (capActual < totalCaps - 1) {
    capActual++;
    mostrarCapitulo(capActual);
  }
});

document.querySelector("[onclick=\"mostrarSeccion('historia')\"]").addEventListener("click", () => {
  capActual = 0;
  mostrarCapitulo(capActual);
});

// --- Videos diarios ---
const videosDiarios = [
  { fecha: "1 de marzo", enlace: "https://youtu.be/U68D7p7x19c" },
  { fecha: "2 de marzo", enlace: "https://youtu.be/GFQP1yHPR1U" },
  { fecha: "3 de marzo", enlace: "https://youtu.be/mpS1ZmBh9uk" },
  { fecha: "4 de marzo", enlace: "https://youtu.be/eWNTmWkZo00" },
  { fecha: "5 de marzo", enlace: "https://youtu.be/F-sApx5VbwI" },
  { fecha: "6 de marzo", enlace: "https://youtu.be/JCqYZCWD4RY" },
  { fecha: "7 de marzo", enlace: "https://youtu.be/jb29tN7Tjyw" },
  { fecha: "8 de marzo", enlace: "https://youtu.be/Mv3jDd73jBQ" },
  { fecha: "9 de marzo", enlace: "https://youtube.com/shorts/IcBFqiy8P_w?feature=share" },
  { fecha: "10 de marzo", enlace: "https://youtu.be/m52ENaXsaaA" },
  { fecha: "15 de marzo", enlace: "https://youtu.be/U0fiA0oyBHk" },
  { fecha: "26 de marzo", enlace: "https://youtube.com/shorts/2FTJ2H4J-VI?feature=share" },
  { fecha: "28 de marzo", enlace: "https://youtube.com/shorts/i7qoVELfEh4?feature=share" },
  { fecha: "5 de abril", enlace: "https://youtu.be/4L3BmmLbJ04" },
  { fecha: "6 de abril", enlace: "https://youtu.be/ZMnjbt3ynVI" },
  { fecha: "13 de abril", enlace: "https://youtu.be/PXHrS78O7OQ" }
];

let videoActual = 0;

function mostrarVideoDiario(index) {
  const contenedor = document.getElementById("videoDiario-contenido");
  contenedor.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.innerText = videosDiarios[index].fecha;
  contenedor.appendChild(titulo);

  const iframe = document.createElement("iframe");
  iframe.src = videosDiarios[index].enlace.replace("/watch?v=", "/embed/").replace("/shorts/", "/embed/");
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.height = "400px";
  contenedor.appendChild(iframe);

  const btnAnteriorVideo = document.getElementById("anteriorVideo");
  const btnSiguienteVideo = document.getElementById("siguienteVideo");

  btnAnteriorVideo.disabled = index === 0;
  btnSiguienteVideo.disabled = index === videosDiarios.length - 1;
}

document.getElementById("anteriorVideo").addEventListener("click", () => {
  if (videoActual > 0) {
    videoActual--;
    mostrarVideoDiario(videoActual);
  }
});

document.getElementById("siguienteVideo").addEventListener("click", () => {
  if (videoActual < videosDiarios.length - 1) {
    videoActual++;
    mostrarVideoDiario(videoActual);
  }
});

document.querySelector("[onclick=\"mostrarSeccion('videos')\"]").addEventListener("click", () => {
  videoActual = 0;
  mostrarVideoDiario(videoActual);
});

// --- Sección de canciones ---
function cargarCancion() {
  const contenedor = document.getElementById("cancion-contenido");
  contenedor.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.innerText = "Sorry, I Love You - Stray Kids";
  contenedor.appendChild(titulo);

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/hIacHcQUK7k";
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.height = "400px";
  contenedor.appendChild(iframe);
}

document.querySelector("[onclick=\"mostrarSeccion('canciones')\"]").addEventListener("click", () => {
  cargarCancion();
});

// --- Sección "Cositas lindas" (vacía de momento) ---
function cargarCositasLindas() {
  const contenedor = document.getElementById("cositas-contenido");
  contenedor.innerHTML = "";

  const mensaje = document.createElement("p");
  mensaje.innerText = "Aquí estaré añadiendo todas las cositas lindas para ti: fotos, videos de dedicatorias, frases y más. ❤️";
  contenedor.appendChild(mensaje);
}

document.querySelector("[onclick=\"mostrarSeccion('cositas')\"]").addEventListener("click", () => {
  cargarCositasLindas();
});

