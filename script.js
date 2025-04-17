// ========================
// Música de fondo YouTube
// ========================
let player;
let sonidoActivo = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-background', {
    videoId: 'pbhs9gFLp1Q', // ID del video de fondo
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
      onReady: e => e.target.playVideo()
    }
  });
}

document.getElementById('activarSonido').addEventListener('click', function() {
  if (!player) return;
  if (!sonidoActivo) {
    player.unMute();
    player.setVolume(8);
    this.innerText = "🔇 Silenciar";
  } else {
    player.mute();
    this.innerText = "🎶 Activar música";
  }
  sonidoActivo = !sonidoActivo;
});

// ========================
// Intro: video + texto
// ========================
function cargarIntroVideo() {
  const origin = encodeURIComponent(window.location.origin);
  document.getElementById("introVideoContainer").innerHTML = `
    <iframe
      id="introPlayer"
      src="https://www.youtube.com/embed/hgexY-RGXfY?rel=0&enablejsapi=1&autoplay=1&mute=1&origin=${origin}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="width:100%;height:400px;"
    ></iframe>
  `;
}
cargarIntroVideo();

document.getElementById("continuarHistoriaBtn").addEventListener("click", () => {
  toggleSection("intro", "historia");
  capActual = 0;
  mostrarCapitulo(0);
});

// ========================
// Navegación auxiliar
// ========================
function toggleSection(hideId, showId) {
  document.getElementById(hideId).style.display = "none";
  document.getElementById(showId).style.display = "block";
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById("volverIntroBtn").addEventListener("click",    () => toggleSection("historia","intro"));
document.getElementById("volverHistoriaBtn").addEventListener("click", () => toggleSection("videos","historia"));
document.getElementById("volverVideosBtn").addEventListener("click",   () => toggleSection("canciones","videos"));
document.getElementById("volverCancionesBtn").addEventListener("click",() => toggleSection("cositas","canciones"));

// ========================
// Nuestra historia
// ========================
const capitulos = [
  { texto: "Te conocí cuando apenas era este morrillo. ¿Quién iba a imaginar que a esa edad, todo pndjo, conocería a la persona que marcaría el resto de su efímera vida? Gracias por confiar ciegamente en mí. ❤️", imagenes: ["imagenes/yorisecu.jpg","imagenes/yorisecu2.jpg"] },
  { texto: "Todo comenzó un 17 de agosto del 2018... en Roblox. Había conocido a Val y weno ya sabes qué pasó xd, pero sin saberlo, ese día también conocí a la persona que marcaría mi vida para siempre: Tú. ❤️", imagenes: ["imagenes/juntitos1.jpg"] },
  { texto: "¿Te acuerdas cuando jugábamos al Royale High? Solo hablábamos, sin hacer mucho, pero en ese lugar nos conocimos más que nunca. Llegaba de la escuela y tú siempre estabas ahí, esperándome. Lista para que habláramos sobre cualquier cosa :3 ❤️", imagenes: ["imagenes/devorando.jpg"] },
  { texto: "Jajaja el día que te tragaste tremendo ntr 😹😹👻. Todo actuado obvio, pero qué risa nos dio ese rato JAJA. ❤️ (Qué está pasando aquí 🗣️🗣️)", imagenes: ["imagenes/ntr.jpg"] },
  { texto: "Eras tan random y tan tú. Gracias por todos esos momentos raros pero únicos. ❤️", imagenes: ["imagenes/pedita.jpg"] },
  { texto: "Cuando alcancé los 10M en el juego ese de ninjas... tú siempre me apoyaste incondicionalmente, incluso cuando mis metas tardaban años. ❤️", imagenes: ["imagenes/10mnin.jpg"] },
  { texto: "Cuando conseguí el torpedo oguo. Siempre estuviste conmigo en todos mis logros, por más mínimos o absurdos que fueran. Gracias por eso. ❤️", imagenes: ["imagenes/torpedo.jpg"] },
  { texto: "Mira esas vibes: niña de casita, tierna, preciosa. Nunca cambiaste, sigues siendo esa bb de siempre. ❤️", imagenes: ["imagenes/ali1.jpg","imagenes/ali2.jpg","imagenes/ali3.jpg"] },
  { texto: "“Te amo pero como amics” — así empezó todo. Me rechazaste, pero aún así el amor se nos escapaba en cada palabra. ❤️", imagenes: ["imagenes/teamoamics.jpg"] },
  { texto: "Cuando por fin te quitaste los filtros... me enamoré más. Tus lentes, tu boquita, tus ojitos, tus cejas... simplemente tú. ❤️", imagenes: ["imagenes/novia1.jpg","imagenes/novia2.jpg"] },
  { texto: "Recuerdo nuestra casita en Minecraft. Tú construías palacios mientras yo me perdía en las minas. Teníamos hasta nuestros hijitos virtuales. ❤️", imagenes: ["imagenes/minecraft.jpg","imagenes/ropa1.jpg","imagenes/ropa2.jpg"] },
  { texto: "El día del paro en el Tec. Me apoyaste aunque al inicio no estabas de acuerdo. Siempre estuviste para mí, incluso en mis locuras. ❤️", imagenes: ["imagenes/paro.jpg"] },
  { texto: "¿Te acuerdas de esto? Solo tú me pedirías algo así, y solo yo te lo mandaría con tanto amor. Nadie más haría eso por ti. También ese día mojaste la cama xdd. Pero fuera de eso... eras tan tú, tan linda, tan sensual y tan mía. También amo esa parte tuya. ❤️", imagenes: ["imagenes/mecorazon.jpg","imagenes/mojada.jpg"] },
  { texto: "Tus dibujos siempre me hacían sentir mal por los contrastes a los que te mandaba yo xdd. Aun así, los guardaba como tesoros. Me hacías sentir especial. ❤️", imagenes: ["imagenes/noteit.jpg"] },
  { texto: "Tus ttas eran arte JAJA. Pero más allá de eso, ver cómo me mirabas mientras las mostrabas... eso me volvía loco. ❤️", imagenes: ["imagenes/tetas.jpg"] },
  { texto: "No importa el tiempo que pase, ni las vueltas que dé la vida, ni la respuesta que me des hoy o mañana... Yo siempre estaré para ti, apoyándote en cada cosa que emprendas. Me encanta que sigas evolucionando como mujer y como persona, cada día aprendiendo algo nuevo y queriéndote superar más y más, incluso si parte del proceso es ya no tenerte a mi lado, lo entenderé y te desearé siempre lo mejor ❤️. Oye por cierto... ¿Por qué aún con cada día que pasa, sigues poniéndote más hermosa que el anterior? ❤️", imagenes: ["imagenes/alinueva1.jpg","imagenes/alinueva2.jpg","imagenes/alinueva3.jpg","imagenes/alinueva4.jpg"] },
  { texto: "Al menos aquí... sí pudimos estar juntos. Quizá en esta realidad dibujada por mis recuerdos, los dos nos encontramos como siempre soñé: frente a frente, con el tiempo detenido y sin miedo a perdernos. Aunque sea en una imagen inventada, eres tú. Siempre has sido tú. Y si pudiera pedirle algo al destino, sería que un día, esa escena deje de ser imaginación… y se convierta en nuestra realidad. Porque yo aún quiero vivirla contigo. ❤️", imagenes: ["imagenes/nostalgia.jpg"] }
];
let capActual = 0;
const totalCaps = capitulos.length;

function mostrarCapitulo(i) {
  const cont = document.getElementById("capitulo-contenido");
  cont.innerHTML = `<p>${capitulos[i].texto}</p>` +
                   capitulos[i].imagenes.map(src => `<img src="${src}">`).join("");
  document.getElementById("contadorCapitulo").innerText = `Capítulo ${i+1}/${totalCaps}`;
  cont.classList.add("fade");
  document.getElementById("anteriorCap").disabled = (i === 0);
  document.getElementById("siguienteCap").innerText =
    (i === totalCaps - 1) ? "👥 Continuar con videos diarios" : "Siguiente";
}

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
    toggleSection("historia", "videos");
    videoActual = 0;
    mostrarVideoDiario(0);
  }
});

// ========================
// Videos diarios
// ========================
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
  { fecha: "13 de abril", enlace: "https://youtu.be/PXHrS78O7OQ" },
  { fecha: "16 de abril", enlace: "https://youtube.com/shorts/9dyyqIbCa4o?feature=share" },
  { fecha: "17 de abril", enlace: "https://youtu.be/WicT03V2jOM" }
];
let videoActual = 0;

function mostrarVideoDiario(i) {
  const cont = document.getElementById("videoDiario-contenido");
  const id = videosDiarios[i].enlace.split('/').pop().split('?')[0];
  cont.innerHTML = `
    <h3>${videosDiarios[i].fecha}</h3>
    <iframe
      src="https://www.youtube.com/embed/${id}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="width:100%;height:400px;"
    ></iframe>
  `;
  document.getElementById("anteriorVideo").disabled = (i === 0);
  document.getElementById("siguienteVideo").innerText =
    (i === videosDiarios.length - 1) ? "🎶 Continuar con canciones" : "Siguiente";
}

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
    toggleSection("videos", "canciones");
    cargarCanciones();
  }
});

// ========================
// Canciones
// ========================
const cancionesData = [
  { title: "Sorry, I Love You - Stray Kids", youtubeId: "hIacHcQUK7k", note: "Bueno aquí no toqué bien el piano pero se intentó jaja." },
  { title: "Cover en español de Sorry I Love You de SKZ", youtubeId: "ShDSJ9rhUTk", note: "Nmms no podía aguantar la risa xdd." },
  { title: "Cover romanizado de Sorry I Love You de SKZ", youtubeId: "hItvFg1ttsY", note: "Si no pude cantar en español, mucho menos así, pero wacha que tanto te amo que lo intento JAJA." },
  { title: "Cover Me de SKZ", youtubeId: "zu1U-pISx6A", note: "Bueno, aquí tampoco me salió perfecto, pero se hizo con todo mi corazón." }
];

function cargarCanciones() {
  const cont = document.getElementById("cancion-contenido");
  cont.innerHTML = cancionesData.map(c => `
    <h3>${c.title}</h3>
    <iframe
      src="https://www.youtube.com/embed/${c.youtubeId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      style="width:100%;height:400px;"
    ></iframe>
    <p>${c.note}</p>
    <hr style="margin:20px 0;">
  `).join("");
}

document.getElementById("continuarCositas").addEventListener("click", () => {
  toggleSection("canciones", "cositas");
  cositaActual = 0;
  mostrarCosita(0);
});

// ========================
// Cositas lindas + prompt
// ========================
const cositasData = [
  { type: "images", text: "Aquí estaré añadiendo todas las cositas lindas para ti: fotos, videos de dedicatorias, frases y más. ❤️", images: ["frases/calaquitas.jpg"] },
  { type: "images", images: ["frases/uno.jpg","frases/dos.jpg","frases/tres.jpg"] },
  { type: "video", youtubeId: "LyDevjFr5fE" },
  { type: "video", youtubeId: "JLOUxj9kuwU" },
  { type: "video", youtubeId: "W9GY6RV_Vbg" },
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
    videoId: "ym0gklzDw3c"
  }
];
let cositaActual = 0;
let noCount = 0;

function mostrarCosita(i) {
  const cont = document.getElementById("cositas-contenido");
  cont.innerHTML = "";
  const d = cositasData[i];

  if (d.text) cont.innerHTML += `<p>${d.text.trim()}</p>`;

  if (d.type === "images") {
    d.images.forEach(src => cont.innerHTML += `<img src="${src}">`);
  } else if (d.type === "video") {
    cont.innerHTML += `
      <iframe
        src="https://www.youtube.com/embed/${d.youtubeId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width:100%;height:400px;"
      ></iframe>
    `;
  } else if (d.type === "final") {
    cont.innerHTML += `
      <iframe
        src="https://www.youtube.com/embed/${d.videoId}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="width:100%;height:400px;margin-top:20px;"
      ></iframe>
      <div id="preguntaNovia" style="margin-top:20px;">
        <p>¿Quieres volver a ser mi novia?</p>
        <button id="respSi" class="resp-btn">Sí ❤️</button>
        <button id="respNo" class="resp-btn">No 😢</button>
      </div>
    `;
  }

  cont.classList.add("fade");
  document.getElementById("anteriorCosita").disabled = (i === 0);

  const btn = document.getElementById("siguienteCosita");
  if (i === cositasData.length - 1) {
    btn.innerText = "Fin";
    btn.onclick = () => {
      alert("Gracias por ver todo. Ojalá haya servido para recordarte lo mucho que te amo. ❤️");
      // Oculta todas las secciones excepto el fondo de YouTube
      ["intro","historia","videos","canciones","cositas","activarSonido"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
      });
    };
  } else {
    btn.innerText = "Siguiente";
    btn.onclick = () => {
      cositaActual++;
      mostrarCosita(cositaActual);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  if (d.type === "final") {
    const yesBtn = document.getElementById("respSi");
    const noBtn  = document.getElementById("respNo");
    yesBtn.onclick = () => alert("nmms de vrd :0?, no fue missclick? no me engañes de esa manera JAJA");
    noBtn.onclick  = () => {
      noCount++;
      if (noCount <= 3) {
        yesBtn.style.transform = `scale(${1 + 0.3 * noCount})`;
      }
      if (noCount === 3) {
        alert("Bueno, ya entendí… ¡tenía que intentarlo! 😊");
      }
    };
  }
}

document.getElementById("anteriorCosita").addEventListener("click", () => {
  if (cositaActual > 0) {
    cositaActual--;
    mostrarCosita(cositaActual);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
