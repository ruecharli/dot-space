console.log("script-iframe.js running!")

const ppc = [2, 3, 3]

// Functions

function nextPage() {
	let path = window.location.pathname
	
	let finalChapter = ppc.length - 1
	let chapterString = path.split(".").reverse()[2]
	let chapterInt = parseInt(chapterString, 10)

	let totalPages = ppc[chapterInt]
	let pageString = path.split(".").reverse()[1]
	let pageInt = parseInt(pageString, 10)

	if (pageInt < totalPages) { // check if more pages left, move forward one page
		pageInt += 1
		let s = "00" + pageInt
		pageString = s.substr(s.length-3)
		return "p." + chapterString + "." + pageString + ".html"
	} else if (chapterInt < finalChapter) { // check if more chapter left, move to first page of next chapter
		chapterInt += 1
		let s = "0" + chapterInt
		chapterString = s.substr(s.length-2)
		return "p." + chapterString + ".001.html"
	} else { // if at last numbered page, move to end page
		return "p.end.html"
	}
}

function prevPage() {
	let path = window.location.pathname
	
	let finalChapter = ppc.length - 1
	let chapterString = path.split(".").reverse()[2]
	let chapterInt = parseInt(chapterString, 10)

	let totalPages = ppc[chapterInt]
	let pageString = path.split(".").reverse()[1]
	let pageInt = parseInt(pageString, 10)
	
	if (pageString === "end") { // check if at end of book, move to last numbered page
		let s = "0" + finalChapter
		chapterString = s.substr(s.length-2)
		pageInt = ppc[finalChapter]
		s = "00" + pageInt
		pageString = s.substr(s.length-3)
		return "p." + chapterString + "." + pageString + ".html"
	} else if (pageInt > 1) { // check if part way through a chapter, move back one page
		pageInt -= 1
		let s = "00" + pageInt
		pageString = s.substr(s.length-3)
		return "p." + chapterString + "." + pageString + ".html"
	} else if (chapterInt > 0) { // check if at start of chapter, move to last page of previous chapter
		chapterInt -= 1
		let s = "0" + chapterInt
		chapterString = s.substr(s.length-2)
		pageInt = ppc[chapterInt]
		s = "00" + pageInt
		pageString = s.substr(s.length-3)
		return "p." + chapterString + "." + pageString + ".html"
	} else { // unlikely to ever happen, just a fallback
		return "p.00.001.html"
	}
}

function pageNum() {
	let path = window.location.pathname
	
	let chapterString = path.split(".").reverse()[2]
	let chapterInt = parseInt(chapterString, 10) // current chapter, 0, 1, 2
	
	let runningTotal = 0
	
	for (let i = chapterInt - 1; i > 0; i--) {
		runningTotal += ppc[i]
	}
	
	let pageString = path.split(".").reverse()[1]
	let pageInt = parseInt(pageString, 10) // current page, 1, 2, 3
	
	runningTotal += pageInt
	
	return runningTotal
}

function guestbookClose() {
	window.parent.postMessage("audioGuestbookClose", "*")
	document.querySelector(".guestbook-form").style.display = "none"
	document.querySelector('.guestbook').src = "img/guestbook-closed.png"
	return
}

window.onload = function() {
	// Reset the form fields when the page loads
	document.getElementById("form").reset();
};

// Image attributes

const noDrag = document.querySelectorAll(".no-drag")

noDrag.forEach(element => {
	element.setAttribute("ondragstart", "return false")
	element.setAttribute("draggable", "false")
})

// Global buttons

const foldLeft = document.querySelector(".fold-left")
if (!!foldLeft) {
	foldLeft.addEventListener("mouseenter", () => {foldLeft.src = "img/fold-left-hover.png"})
	foldLeft.addEventListener("mouseleave", () => {foldLeft.src = "img/fold-left-normal.png"})
	foldLeft.addEventListener("click", () => {
		window.parent.postMessage("audioFlipPage", "*")
		open(prevPage(), "_self")
	})
}

const foldRight = document.querySelector(".fold-right")
if (!!foldRight) {
	foldRight.addEventListener("mouseenter", () => {foldRight.src = "img/fold-right-hover.png"})
	foldRight.addEventListener("mouseleave", () => {foldRight.src = "img/fold-right-normal.png"})
	foldRight.addEventListener("click", () => {
		window.parent.postMessage("audioFlipPage", "*")
		open(nextPage(), "_self")
	})
}

const ribbonLeft = document.querySelector(".ribbon-left")
if (!!ribbonLeft) {
	ribbonLeft.addEventListener("mouseenter", () => {ribbonLeft.src = "img/ribbon-left-hover.png"})
	ribbonLeft.addEventListener("mouseleave", () => {ribbonLeft.src = "img/ribbon-left-normal.png"})
	ribbonLeft.addEventListener("click", () => {
		window.parent.postMessage("audioRibbonUse", "*")
		open("p.00.002.html", "_self")
	})
}

const ribbonRight = document.querySelector(".ribbon-right")
if (!!ribbonRight) {
	ribbonRight.addEventListener("mouseenter", () => {ribbonRight.src = "img/ribbon-right-hover.png"})
	ribbonRight.addEventListener("mouseleave", () => {ribbonRight.src = "img/ribbon-right-normal.png"})
	ribbonRight.addEventListener("click", () => {
		window.parent.postMessage("audioRibbonUse", "*")
		open("p.00.002.html", "_self")
	})
}

const pageNumLeft = document.querySelector(".page-num-left")
if (!!pageNumLeft) {
	let leftTotal = pageNum() * 2 - 2
	document.querySelector(".page-num-left").innerText = leftTotal
}

const pageNumRight = document.querySelector(".page-num-right")
if (!!pageNumRight) {
	let rightTotal = pageNum() * 2 - 1
	document.querySelector(".page-num-right").innerText = rightTotal
}

// Unique buttons
const guestbook = document.querySelector(".guestbook")
if (!!guestbook) {
	let guestbookIsClick = Boolean(false)

	guestbook.addEventListener("mouseenter", () => {
		if (!guestbookIsClick) {guestbook.src = "img/guestbook-hover.png"}
	})

	guestbook.addEventListener("mouseleave", () => {
		if (!guestbookIsClick) {guestbook.src = "img/guestbook-closed.png"}
	})

	guestbook.addEventListener("click", () => {
		if (!guestbookIsClick) {
			guestbookIsClick = Boolean(true)
			window.parent.postMessage("audioGuestbookOpen", "*")
			guestbook.src = "img/guestbook-opened.png"
			guestbook.style.cursor = "auto"
			document.querySelector(".guestbook-form").style.display = "block"
		}
	})
}
