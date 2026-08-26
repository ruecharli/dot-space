function textDelphin(tdn, str) {
	document.querySelector(tdn).classList.add("display-flex")
	for (let i = 0; i < str.length; i++) {
		let character = document.createElement("img")
		let charId = str.charAt(i)
		if (charId == charId.toUpperCase()) {
			character.src = "img/font/d-" + charId + ".png"
		} else {
			character.src = "img/font/d-" + charId + "l.png"
		}
		character.classList.add("no-drag", "character-delphin")
		character.setAttribute("ondragstart", "return false;")
		character.setAttribute("draggable", "false")
		document.querySelector(tdn).appendChild(character)
	}
}