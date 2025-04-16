// ==================================================
//        YOUTUBE BACKGROUND MUSIC (Música de fondo)
// ==================================================
let player;
let sonidoActivo = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-background', {
    videoId: 'pbhs9gFLp1Q',  // Tu ID de video de fondo
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'pbhs9gFLp1Q',
      controls: 0,
      mute: 1,
      enablejsapi: 1,
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
  if (player && player.unMute) {
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

// ==================================================
//          INTRO (Video + texto inicial)
// ==================================================
function cargarIntroVideo() {
  const introContainer = document.getElementById("introVideoContainer");
  introContainer.innerHTML = "";

  // Reemplaza 'PLACEHOLDER_VIDEO_ID' con el ID real
  // cuando tengas el link de YouTube para la introducción.
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/PLACEHOLDER_VIDEO_ID";
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.height = "400px";

  introContainer.appendChild(iframe);
}

// Cargar el video de intro apenas abra la página
cargarIntroVideo();

// Botón para continuar con la historia
document.getElementById("continuarHistoriaBtn").addEventListener("click", () => {
  // Ocultamos intro, mostramos historia
  document.getElementById("intro").style.display = "none";
  document.getElementById("historia").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });

  capActual = 0;
  mostrarCapitulo(capActual);
});

// ==================================================
//     NUESTRA HISTORIA
// ==================================================
const capitulos = [
  {
    texto: "Te conocí cuando apenas era este morrillo. ¿Quién iba a imaginar que a esa edad, todo pndjo, conocería a la persona que marcaría el resto de su efímera vida? Gracias por confiar ciegamente en mí. ❤️",
    imagenes: ["imagenes/yorisecu.jpg", "imagenes/yorisecu2.jpg"]
  },
  {
    texto: "Todo comenzó un 17 de agosto del 2018... en Roblox. Había conocido a Val y weno ya sabes qué pasó xd, pero sin saberlo, ese día también conocí a la persona que marcaría mi vida para siempre: Tú. ❤️",
    imagenes: ["imagenes/juntitos1.jpg"]
  },
  {
    texto: "¿Te acuerdas cuando jugábamos al Royale High? Solo hablábamos, sin hacer mucho, pero en ese lugar nos conocimos más que nunca. Llegaba de la escuela y tú siempre estabas ahí, esperándome. Lista para que habláramos sobre cualquier cosa :3 ❤️",
    imagenes: ["imagenes/devorando.jpg"]
  },
  {
    texto: "Jajaja el día que te tragaste tremendo ntr 😹😹👻. Todo actuado obvio, pero qué risa nos dio ese rato JAJA. ❤️ (Qué está pasando aquí 🗣️🗣️)",
    imagenes: ["imagenes/ntr.jpg"]
  },
  {
    texto: "Eras tan random y tan tú. Gracias por todos esos momentos raros pero únicos. ❤️",
    imagenes: ["imagenes/pedita.jpg"]
  },
  {
    texto: "Cuando alcancé los 10M en el juego ese de ninjas... tú siempre me apoyaste incondicionalmente, incluso cuando mis metas tardaban años. ❤️",
    imagenes: ["imagenes/10mnin.jpg"]
  },
  {
    texto: "Cuando conseguí el torpedo oguo. Siempre estuviste conmigo en todos mis logros, por más mínimos o absurdos que fueran. Gracias por eso. ❤️",
    imagenes: ["imagenes/torpedo.jpg"]
  },
  {
    texto: "Mira esas vibes: niña de casita, tierna, preciosa. Nunca cambiaste, sigues siendo esa bb de siempre. ❤️",
    imagenes: ["imagenes/ali1.jpg", "imagenes/ali2.jpg", "imagenes/ali3.jpg"]
  },
  {
    texto: "“Te amo pero como amics” — así empezó todo. Me rechazaste, pero aún así el amor se nos escapaba en cada palabra. ❤️",
    imagenes: ["imagenes/teamoamics.jpg"]
  },
  {
    texto: "Cuando por fin te quitaste los filtros... me enamoré más. Tus lentes, tu boquita, tus ojitos, tus cejas... simplemente tú. ❤️",
    imagenes: ["imagenes/novia1.jpg", "imagenes/novia2.jpg"]
  },
  {
    texto: "Recuerdo nuestra casita en Minecraft. Tú construías palacios mientras yo me perdía en las minas. Teníamos hasta nuestros hijitos virtuales. ❤️",
    imagenes: ["imagenes/minecraft.jpg", "imagenes/ropa1.jpg", "imagenes/ropa2.jpg"]
  },
  {
    texto: "El día del paro en el Tec. Me apoyaste aunque al inicio no estabas de acuerdo. Siempre estuviste para mí, incluso en mis locuras. ❤️",
    imagenes: ["imagenes/paro.jpg"]
  },
  {
    texto: "¿Te acuerdas de esto? Solo tú me pedirías algo así, y solo yo te lo mandaría con tanto amor. Nadie más haría eso por ti. También ese día mojaste la cama xdd. Pero fuera de eso... eras tan tú, tan linda, tan sensual y tan mía. También amo esa parte tuya. ❤️",
    imagenes: ["imagenes/mecorazon.jpg", "imagenes/mojada.jpg"]
  },
  {
    texto: "Tus dibujos siempre me hacían sentir mal por los contrastes a los que te mandaba yo xdd. Aun así, los guardaba como tesoros. Me hacías sentir especial. ❤️",
    imagenes: ["imagenes/noteit.jpg"]
  },
  {
    texto: "Tus ttas eran arte JAJA. Pero más allá de eso, ver cómo me mirabas mientras las mostrabas... eso me volvía loco. ❤️",
    imagenes: ["imagenes/tetas.jpg"]
  },
  {
    texto: "No importa el tiempo que pase, ni las vueltas que dé la vida, ni la respuesta que me des hoy o mañana... Yo siempre estaré para ti, apoyándote en cada cosa que emprendas. Me encanta que sigas evolucionando como mujer y como persona, cada día aprendiendo algo nuevo y queriéndote superar más y más, incluso si parte del proceso es ya no tenerte a mi lado, lo entenderé y te desearé siempre lo mejor ❤️. Oye por cierto... ¿Por qué aún con cada día que pasa, sigues poniéndote más hermosa que el anterior? ❤️",
    imagenes: ["imagenes/alinueva1.jpg", "imagenes/alinueva2.jpg", "imagenes/alinueva3.jpg", "imagenes/alinueva4.jpg"]
  },
  {
    texto: "Al menos aquí... sí pudimos estar juntos. Quizá en esta realidad dibujada por mis recuerdos, los dos nos encontramos como siempre soñé: frente a frente, con el tiempo detenido y sin miedo a perdernos. Aunque sea en una imagen inventada, eres tú. Siempre has sido tú. Y si pudiera pedirle algo al destino, sería que un día, esa escena deje de ser imaginación… y se convierta en nuestra realidad. Porque yo aún quiero vivirla contigo. ❤️",
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
  void contenido.offsetWidth; // forzar repaint
  contenido.classList.add("fade");

  document.getElementById("anteriorCap").disabled = (index === 0);

  if (index === totalCaps - 1) {
    document.getElementById("siguienteCap").innerText = "👥 Continuar con videos diarios";
  } else {
    document.getElementById("siguienteCap").innerText = "Siguiente";
  }
}

// Botones "Anterior" y "Siguiente" de Historia
document.getElementById("anteriorCap").addEventListener("click", () => {
  if (capActual > 0) {
    capActual--;
    mostrarCapitulo(capActual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

document.getElementById("siguienteCap").addEventListener("click", () => {
  if (capActual < totalCaps - 1) {
    capActual++;
    mostrarCapitulo(capActual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Último capítulo => pasar a Videos diarios
    document.getElementById("historia").style.display = "none";
    document.getElementById("videos").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    videoActual = 0;
    mostrarVideoDiario(videoActual);
  }
});

// Botón para volver a Intro
document.getElementById("volverIntroBtn").addEventListener("click", () => {
  document.getElementById("historia").style.display = "none";
  document.getElementById("intro").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================================================
//        VIDEOS DIARIOS
// ==================================================
const videosDiarios = [
  { fecha: "1 de marzo", enlace: "https://youtu.be/U68D7p7x19c" },
  { fecha: "2 de marzo", enlace: "https://youtu.be/GFQP1yHPR1U" },
  { fecha: "3 de marzo", enlace: "https://youtu.be/mpS1ZmBh9uk" },
  { fecha: "4 de marzo", enlace: "https://youtu.be/eWNTmWkZo00" },
  { fecha: "5 de marzo", enlace: "https://youtu.be/F-sApx5VbwI" },
  { fecha: "6 de marzo", enlace: "https://youtu.be/JCqYZCWD4RY" },
  { fecha: "7 de marzo", enlace: "https://youtu.be/jb29tN7Tjyw" },
  { fecha: "8 de marzo", enlace: "https://youtu.be/Mv3jDd73jBQ" },
  { fecha: "9 de marzo", enlace: "https://youtu.be/IcBFqiy8P_w" },
  { fecha: "10 de marzo", enlace: "https://youtu.be/m52ENaXsaaA" },
  { fecha: "15 de marzo", enlace: "https://youtu.be/U0fiA0oyBHk" },
  { fecha: "26 de marzo", enlace: "https://youtu.be/2FTJ2H4J-VI" },
  { fecha: "28 de marzo", enlace: "https://youtu.be/i7qoVELfEh4" },
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
  const videoId = videosDiarios[index].enlace.split('/').pop().split('?')[0];
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.frameBorder = "0";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.width = "100%";
  iframe.style.height = "400px";
  contenedor.appendChild(iframe);

  document.getElementById("anteriorVideo").disabled = (index === 0);

  if (index === videosDiarios.length - 1) {
    document.getElementById("siguienteVideo").innerText = "🎶 Continuar con canciones";
  } else {
    document.getElementById("siguienteVideo").innerText = "Siguiente";
  }
}

// Botones de Videos diarios
document.getElementById("anteriorVideo").addEventListener("click", () => {
  if (videoActual > 0) {
    videoActual--;
    mostrarVideoDiario(videoActual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

document.getElementById("siguienteVideo").addEventListener("click", () => {
  if (videoActual < videosDiarios.length - 1) {
    videoActual++;
    mostrarVideoDiario(videoActual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Último video => pasar a Canciones
    document.getElementById("videos").style.display = "none";
    document.getElementById("canciones").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    cargarCanciones();
  }
});

// Botón para volver a la historia
document.getElementById("volverHistoriaBtn").addEventListener("click", () => {
  document.getElementById("videos").style.display = "none";
  document.getElementById("historia").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================================================
//         CANCIONES (Múltiples videos)
// ==================================================
const cancionesData = [
  {
    title: "Sorry, I Love You - Stray Kids",
    youtubeId: "hIacHcQUK7k",
    note: "Bueno aquí no toqué bien el piano pero se intentó jaja."
  },
  {
    title: "Cover en español de Sorry I Love You de SKZ",
    youtubeId: "ShDSJ9rhUTk",
    note: "Nmms no podía aguantar la risa xdd."
  },
  {
    title: "Cover romanizado de Sorry I Love You de SKZ",
    youtubeId: "hItvFg1ttsY",
    note: "Si no pude cantar en español, mucho menos así, pero wacha que tanto te amo que lo intento JAJA."
  },
  {
    title: "Cover Me de SKZ",
    youtubeId: "zu1U-pISx6A",
    note: "Bueno, aquí tampoco me salió perfecto, pero se hizo con todo mi corazón."
  }
];

function cargarCanciones() {
  const contenedor = document.getElementById("cancion-contenido");
  contenedor.innerHTML = "";

  cancionesData.forEach(cancion => {
    // Título
    const titulo = document.createElement("h3");
    titulo.innerText = cancion.title;
    contenedor.appendChild(titulo);

    // Video
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${cancion.youtubeId}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "400px";
    contenedor.appendChild(iframe);

    // Nota graciosa/romántica
    const nota = document.createElement("p");
    nota.innerText = cancion.note;
    contenedor.appendChild(nota);

    // Separador visual (opcional)
    const hr = document.createElement("hr");
    hr.style.margin = "20px 0";
    contenedor.appendChild(hr);
  });
}

// Botón para continuar a Cositas lindas
document.getElementById("continuarCositas").addEventListener("click", () => {
  document.getElementById("canciones").style.display = "none";
  document.getElementById("cositas").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });

  cositaActual = 0;
  mostrarCosita(cositaActual);
});

// Botón para volver a Videos
document.getElementById("volverVideosBtn").addEventListener("click", () => {
  document.getElementById("canciones").style.display = "none";
  document.getElementById("videos").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================================================
//      COSITAS LINDAS
// ==================================================
/*
  Orden deseado:
    1) Texto + img "calaquitas"
    2) Imágenes: "uno", "dos", "tres"
    3) Video 1
    4) Video 2
    5) Video 3
    6) Texto final + video final
*/
const cositasData = [
  {
    type: "images",
    text: "Aquí estaré añadiendo todas las cositas lindas para ti: fotos, videos de dedicatorias, frases y más. ❤️",
    images: ["frases/calaquitas.jpg"]
  },
  {
    type: "images",
    images: ["frases/uno.jpg", "frases/dos.jpg", "frases/tres.jpg"]
  },
  {
    type: "video",
    youtubeId: "LyDevjFr5fE" // rezandopaqueregreses
  },
  {
    type: "video",
    youtubeId: "JLOUxj9kuwU" // enotrouniverso
  },
  {
    type: "video",
    youtubeId: "W9GY6RV_Vbg" // dedicatorias
  },
  {
    type: "final",
    text: `
      ❤️ 17/04/2025 ❤️

      Mi amada Alisson:

      Hemos llegado al final de esta pequeña gran sorpresa. Antes que nada, quiero agradecerte por existir en mi vida y por cada sonrisa que me has regalado. También quiero pedirte perdón por todos mis errores, por las veces en que mis acciones o mis palabras te lastimaron y, sobre todo, por no haberte cuidado como merecías.

      Hoy, en nuestro aniversario, quiero que sepas que mi corazón sigue atado al tuyo. Si de verdad estás segura de que no sientes nada ya por mí, entiendo tu decisión y la respeto. Pero si en algún momento, durante este recorrido, sentiste una pizca de ese amor que antes nos unía, para mí es la prueba de que nuestro amor persiste. Te quiero recuperar a como dé lugar, pero también sabré esperar lo que haga falta, porque confío en que lo que vivimos no fue en vano.

      Te deseo lo mejor, aunque sea lejos de mí. Sin embargo, no negaré que mi ilusión sigue siendo que un día nos reencontremos y volvamos a sonreír juntos. Perdón por mis estupideces, por las veces en que te incomodé o te hice enojar. Me arrepiento de haber arruinado algo tan bello que teníamos, y aunque me digas que no, yo seguiré confiando en que nuestro amor fue (y es) real.

      Gracias por cada momento que compartiste conmigo, por tu dulzura, por tu alegría, por tu manera de ver la vida y hacerme sentir tan especial. Pase lo que pase, siempre tendrás un pedazo de mi corazón.

      Con todo mi amor y esperando que algún día volvamos a coincidir,
      Diego Yorel Castelán Silva ❤️
    `,
    videoId: "PLACEHOLDER_FINAL"
  }
];

let cositaActual = 0;

function mostrarCosita(index) {
  const contenedor = document.getElementById("cositas-contenido");
  contenedor.innerHTML = "";
  
  const data = cositasData[index];

  if (data.text) {
    const p = document.createElement("p");
    p.innerText = data.text.trim();
    contenedor.appendChild(p);
  }
  
  if (data.type === "images") {
    data.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      contenedor.appendChild(img);
    });
  } else if (data.type === "video") {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${data.youtubeId}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "400px";
    contenedor.appendChild(iframe);
  } else if (data.type === "final") {
    // Texto final ya lo añadimos arriba
    // Agregamos un iframe adicional si tienes un video final
    if (data.videoId) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${data.videoId}`;
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.style.width = "100%";
      iframe.style.height = "400px";
      contenedor.appendChild(iframe);
    }
  }

  contenedor.classList.remove("fade");
  void contenedor.offsetWidth;
  contenedor.classList.add("fade");

  document.getElementById("anteriorCosita").disabled = (index === 0);

  const btnSiguiente = document.getElementById("siguienteCosita");
  if (index === cositasData.length - 1) {
    btnSiguiente.innerText = "Fin";
    btnSiguiente.onclick = () => {
      alert("Gracias por ver todo. Ojalá haya servido para recordarte lo mucho que te amo. ❤️");
      // Aquí podrías resetear la página, o redirigir a otro lado.
      // location.reload();
      document.getElementById("cositas").style.display = "none";
    };
  } else {
    btnSiguiente.innerText = "Siguiente";
    btnSiguiente.onclick = () => {
      cositaActual++;
      mostrarCosita(cositaActual);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }
}

// Botones "Anterior" y "Siguiente" de Cositas lindas
document.getElementById("anteriorCosita").addEventListener("click", () => {
  if (cositaActual > 0) {
    cositaActual--;
    mostrarCosita(cositaActual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Botón para volver a Canciones
document.getElementById("volverCancionesBtn").addEventListener("click", () => {
  document.getElementById("cositas").style.display = "none";
  document.getElementById("canciones").style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
