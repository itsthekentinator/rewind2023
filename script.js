document.addEventListener('DOMContentLoaded', function () {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const dateSlider = document.getElementById('dateSlider');
    const speedSlider = document.getElementById('speedSlider');
    const startButton = document.getElementById('startButton');

    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(); // current date

    let currentDate = new Date(startDate);

    function updateDate() {
        dayInput.value = currentDate.getDate();
        monthInput.value = currentDate.toLocaleString('default', { month: 'long' });
        yearInput.value = currentDate.getFullYear();
    }

    function updateSlider() {
        const percentage = ((currentDate - startDate) / (endDate - startDate)) * 100;
        dateSlider.value = percentage;
    }

    function replayDates() {
        const speed = speedSlider.value * 1000; // convert to milliseconds
        const intervalId = setInterval(() => {
            currentDate.setDate(currentDate.getDate() + 1);
            updateDate();
            updateSlider();

            if (currentDate > endDate) {
                clearInterval(intervalId);
            }
        }, speed);
    }

    startButton.addEventListener('click', () => {
        currentDate = new Date(startDate);
        updateDate();
        replayDates();
    });

    dateSlider.addEventListener('input', () => {
        const percentage = dateSlider.value / 100;
        currentDate = new Date(startDate.getTime() + percentage * (endDate - startDate));
        updateDate();
    });
});
