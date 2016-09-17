'use strict';

function ImageCompare() {

    let sensitivity = 30;

    function compare(tempCanvas1, tempCanvas2, width, height) {

        tempCanvas1.drawImage(image1, 0, 0, width, height);
        tempCanvas2.drawImage(image2, 0, 0, width, height);

        let sumx = 0;
        let sumy = 0;
        let changes = 0;

        for (let x = 0; x < width; x ++) {
            for (let y = 0; y < height; y ++) {
                let pixel1 = getImageData(x, y, 1, 1);
                let pixel2 = getImageData(x, y, 1, 1);

                if (comparepixel(pixel1.data, pixel2.data)) {
                    sumx += x;
                    sumy += y;
                    changes += 1;
                }
            }
        }

        let location = [sumx / changes, sumy / changes];

        return location;


    function comparepixel(p1data, p2data) {

        let diff = false;
        let dr, dg, db;
        dr = (p1data[0] - p2data[0]);
        dg = (p1data[1] - p2data[1]);
        db = (p1data[2] - p2data[2]);

        distance = Math.sqrt( dr * dr + dg * dg + db * db );

        if (distance < sensitivity) {
            diff = true;
        }
        return diff;

        }
    }

    return {
        compare: compare
    }
};
