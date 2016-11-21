apiKey = '4fe074c5bc82d2e1fdaad4458bc598e7';
weekday = new Array(7);
weekday[0] = "SUN";
weekday[1] = "MON";
weekday[2] = "TUE";
weekday[3] = "WED";
weekday[4] = "THU";
weekday[5] = "FRI";
weekday[6] = "SAT";

$('.container').on('submit', function (e) {
    e.preventDefault();
    showLoader();
    $('input').blur();
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + $('input[name="city"]').val() +
        '&mode=json&units=metric&cnt=6&appid=' + apiKey;
    $.ajax({
        url: url
    }).done(function (result) {
        var dayForecasts = result.list;
        var day = new Date();
        //change city and country
        $('.forecast .city-info > .city-name').text(result.city.name);
        $('.forecast .city-info > .country-code').text(result.city.country);
        $.each(dayForecasts, function (index, dayForecast) {
            //change weather icons
            var weatherCondition = dayForecast.weather[0].id.toString();
            if (weatherCondition.startsWith('2')) {
                $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'O');
            }
            else if (weatherCondition.startsWith('3')) {
                $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'Q');
            }
            else if (weatherCondition.startsWith('5')) {
                $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'R');
            }
            else if (weatherCondition.startsWith('6')) {
                $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'W');
            }
            else if (weatherCondition.startsWith('7')) {
                $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'M');
            }
            else if (weatherCondition.startsWith('8')) {
                if (weatherCondition === '800') {
                    //day or night
                    if (dayForecast.weather[0].icon.endsWith('d')) {
                        $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'B');
                    }
                    else {
                        $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'C');
                    }

                }
                else {
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', 'Y');
                }
            }
            else {
                $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons', '(');
            }
            if (index != 0) {
                //change day labels
                //check if one of the next days is over sunday
                if (day.getDay() + index < 7) {
                    $('.day-forecast').eq(index).find('.day-label').text(weekday[day.getDay() + index]);
                }
                else {
                    $('.day-forecast').eq(index).find('.day-label').text(weekday[(day.getDay() + index) - 7]);
                }
            }
            //change temperatures
            $('.day-forecast').eq(index).find('.temp > .highest > .temp-text').text(parseInt(dayForecast.temp.max));
            $('.day-forecast').eq(index).find('.temp > .lowest > .temp-text').text(parseInt(dayForecast.temp.min));
        });
        $('.forecast').removeClass('hidden');
    }).fail(function () {
        $('.error').removeClass('hidden');
    }).always(function () {
        setTimeout(function () {
            hideLoader();
        }, 2000);
    });
});
