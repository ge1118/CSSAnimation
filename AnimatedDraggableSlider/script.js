const track = document.getElementById('slider');

const handleOnDown = (e) => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === '0') return;

    const mouseDelta =  parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth;

    const percentage = (mouseDelta/maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -70);

    track.dataset.percentage = nextPercentage;
    console.log(`track.dataset.mouseDownAt: ${track.dataset.mouseDownAt}`);
    console.log(`clientX: ${e.clientX}`);
    console.log(`mouseDelta: ${mouseDelta}`);
    console.log(`percentage: ${percentage}`);
    console.log(`nextPercentageUnconstrained: ${nextPercentageUnconstrained}`);
    console.log(`nextPercentage: ${nextPercentage}`);

    track.animate({
        transform: `translateX(${nextPercentage}%)`
    }, {
        duration:1200, fill: 'forwards'
    })
}

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);