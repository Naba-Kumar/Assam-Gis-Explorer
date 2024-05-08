exports.renderMap = (req, res) => {
    // Your OpenLayers logic here
    res.sendFile(path.join(__dirname, 'public', 'openlayers', 'gis.html'));

};

// Add more controller functions for GIS functionality
