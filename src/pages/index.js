
const form = document.getElementById('booking-form');
const roomSelect = document.getElementById('room-select');
const dateInput = document.getElementById('date-input');
const startTimeInput = document.getElementById('start-time-input');
const endTimeInput = document.getElementById('end-time-input');
const allDayCheckbox = document.getElementById('all-day-checkbox');
const commentInput = document.getElementById('comment-input');
const submitButton = document.getElementById('submit-button');
const timeslotSelect = document.getElementById('timeslot-select');
const durationSelect = document.getElementById('duration-select');
const startTimeSelect = document.getElementById('start-time-select');
const endTimeSelect = document.getElementById('end-time-select');
const durationSpan = document.getElementById('duration-span');
const clearButton = document.getElementById('clear-button');
const towerSelect = document.getElementById('tower-select');
const floorSelect = document.getElementById('floor-select');

const towerOptions = [
	{ value: 'A', label: 'Башня А' },
	{ value: 'B', label: 'Башня Б' },
];

for (const option of towerOptions) {
	const optionEl = document.createElement('option');
	optionEl.value = option.value;
	optionEl.textContent = option.label;
	towerSelect.appendChild(optionEl);
}

for (let i = 3; i <= 27; i++) {
	const option = document.createElement('option');
	option.value = i;
	option.textContent = i;
	floorSelect.appendChild(option);
}

for (let i = 1; i <= 8; i++) {
	const option = document.createElement('option');
	option.value = i.toString();
	option.textContent = `Переговорная ${i.toString()}`;
	roomSelect.appendChild(option);
}

function createTimeOptions(startHour, endHour, step, defaultValue) {
	const options = [];
	options.push(`<option value="" selected>${defaultValue}</option>`);
	for (let hour = startHour; hour <= endHour; hour++) {
		for (let minute = 0; minute < 60; minute += step) {
			const formattedHour = hour.toString().padStart(2, '0');
			const formattedMinute = minute.toString().padStart(2, '0');
			const time = `${formattedHour}:${formattedMinute}`;

			options.push(`<option value="${time}">${time}</option>`);
		}
	}
	return options.join('');
}

startTimeSelect.innerHTML = createTimeOptions(
	9,
	17,
	30,
	'-- Выберите время --'
);
endTimeSelect.innerHTML = createTimeOptions(9, 18, 30, '-- Выберите время --');

startTimeSelect.addEventListener('change', (event) => {
	const selectedStartTime = event.target.value;
	if (selectedStartTime) {
		const endHour = parseInt(selectedStartTime.split(':')[0]) + 1;
		endTimeSelect.innerHTML = createTimeOptions(
			endHour,
			18,
			30,
			'-- Выберите время --'
		);
	} else {
		endTimeSelect.innerHTML = createTimeOptions(
			9,
			18,
			30,
			'-- Выберите время --'
		);
	}
});

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const data = {
		tower: towerSelect.value,
		floor: floorSelect.value,
		room: roomSelect.value,
		date: dateInput.value,
		startTime: startTimeSelect.value,
		endTime: endTimeSelect.value,
		comment: commentInput.value,
	};

	console.log(JSON.stringify(data));
});

clearButton.addEventListener('click', () => {
	form.reset();
});
