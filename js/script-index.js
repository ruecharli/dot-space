function getRandomIntInclusive (min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

window.addEventListener("message", iframeListener => {
	switch (iframeListener.data) {
		case "audioFlipPage":
			let randomFlipPage = "mp3/flip-page" + getRandomIntInclusive(1, 4) + ".mp3"
			let audioFlipPage = document.querySelector(".iframe-audio")
			audioFlipPage.volume = 0.2;
			audioFlipPage.src = randomFlipPage
			audioFlipPage.play();
			break
		case "audioRibbonUse":
			let randomRibbonUse = "mp3/ribbon-use" + getRandomIntInclusive(1, 4) + ".mp3"
			let audioRibbonUse = document.querySelector(".iframe-audio")
			audioRibbonUse.volume = 0.2;
			audioRibbonUse.src = randomRibbonUse
			audioRibbonUse.play()
			break
		case "audioGuestbookOpen":
			let audioGuestbookOpen = document.querySelector(".iframe-audio")
			audioGuestbookOpen.volume = 0.15;
			audioGuestbookOpen.src = "mp3/guestbook-open.mp3"
			audioGuestbookOpen.play()
			break
		case "audioGuestbookClose":
			let audioGuestbookClose = document.querySelector(".iframe-audio")
			audioGuestbookClose.volume = 0.1;
			audioGuestbookClose.src = "mp3/guestbook-close.mp3"
			audioGuestbookClose.play()
			break
		default: break
	}
})

const noDrag = document.querySelectorAll(".no-drag")

noDrag.forEach(element => {
	element.setAttribute("ondragstart", "return false")
	element.setAttribute("draggable", "false")
})