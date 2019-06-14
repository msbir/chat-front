import axios from 'axios';

const city = () => {
    $.ajax({
        url: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_LOCATION_KEY}&libraries=places`,
        crossDomain: true,
        method: 'GET',
        async: false,
        dataType: 'script',
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    });
}

export default city;
