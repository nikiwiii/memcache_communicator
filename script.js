let colorON = true
let style
let firstMessage = true
let rendered = []
let styled = []

const date = Math.floor((Date.now()%86400000)/100);
console.log(date)

tortureNick = () => {
   const str = prompt("Podaj nick (litery i cyfry dozwolone)")
   const pat = /^[\w.-]*$/
   if(!pat.test(str)){
      return tortureNick()
   }
   else {
      return str
   }
}
let nick = tortureNick()

getColor = (searched) => {
   fetch(`color.php?nick=${searched}`,{
      method:'get'
   }).then((data) => {
      data.text().then((v) => {
         if (!v && searched == nick) {
            generateColor()
         }
         else {
            style.innerHTML += `.${searched} {color: ${v};} `
            styled.push(searched)
            if (searched == nick){
               return v
            }
         }
      });
   })
}
let userColor = getColor(nick)

loadIn = async() => {
   // await fetch(`get.php?date=${date}`, {
  while(true){
   console.log("loading");
   await fetch(`get.php?date=${Math.floor((Date.now()%86400000)/100)}`, {
      method: 'get'
   }).then((data) => {
      data.text().then((val) => {
         if(val){
            const result = JSON.parse(val)
            console.log(result);
            Object.keys(result).forEach(i => {
               if (parseInt(i) && !rendered.includes(i)){
                  const time = result[i].substring(0,5)
                  const readnick = result[i].substring(5,result[i].indexOf(":",5))
                  const message = result[i].slice(result[i].indexOf(":")+3)
                  if (message == `${readnick}: /color`) {
                     styled.filter((e) => e !== readnick)
                  }
                  else if (message == `${readnick}: /reset`) {
                     document.querySelector(".messages").innerHTML = ""
                  }
                  else {
                     document.querySelector(".messages").innerHTML += `<p class='${readnick}'><span class='time'>${time}</span> ${message}</p>`
                     $(`.${readnick}`).emoticonize()
                     rendered.push(i)
                     if (!styled.includes(readnick)){
                        getColor(readnick)
                     }
                  }
               }
            })
         }
         else {
            console.log("nothing");
         }
         })
      });
  }
}

window.onload = async() => {
   document.getElementById("nick").textContent += nick
   const input = document.getElementById("message")
   style = document.createElement('style');
   style.type = 'text/css';
   document.querySelector("head").appendChild(style)
   input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      send()
      }
   });
   await loadIn()
}
send = () => {
   const message = document.getElementById("message").value
   document.getElementById("message").value = ""
   switch (message) {
      case "/color":
         generateColor()
         break;
      case "/reset":
         fetch(`reset.php`)
         break;
      case "/colorswitch":
         colorON = colorON ? false : true
         if(colorON){
            document.querySelector("head").appendChild(style)
         }
         else {
            document.querySelector("head").removeChild(style)
         }
         break;
      case "/help":
         document.querySelector(".messages").innerHTML += '<p style="opacity:.5">/color - zmień swój kolor<br>/colorswitch - wyłącz kolory<br>/reset - zresetuj bazę Memcached</p>'
         break;
      default:
         break
   }
   if (message != "/colorswitch" && message != "/help"){
      fetch(`set.php?nick=${nick}&message=${message}&date=${Math.floor((Date.now()%86400000)/100)}`)
   }
}

generateColor = () => {
   console.log(userColor);
   userColor = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
   fetch(`set.php?color=${userColor}&nick=${nick}`)
   style.innerHTML.replace(`.${nick} {color: ${userColor};} `, "")
   console.log(userColor);
}

