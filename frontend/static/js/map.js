function drawMap(url, id, title, low, high) {
	var myChart = echarts.init(document.getElementById(id));
	$.getJSON(url, result => {
		let regions = [];
		let values = [];
		let option_series = [];
	    $.each(result, (r, v) => {
	        regions.push(r);
	        values.push(v);
	    });

	    for(let i = 0; i < dates.length; i++) {
    		let temp = [];
    		for(let j = 0; j < values.length; j++) {
        		temp.push({
        			name: regions[j],
        			value: values[j][i]});
    		}
    		option_series.push({series: {data: temp}});
		}

		let option = {
			baseOption: {
				timeline: {
					axisType: 'category',
				    realtime: true,
				    loop: true,
				    autoPlay: true,
				    playInterval: 750,
		            symbol: 'None',
		            left: 'center',
		            width: '90%',
				    tooltip: {formatter: dates},
				    data: dates
				},
				tooltip: {
			        trigger: 'item',
		        	formatter: '{b}<br/>{c}'
			    },
			    visualMap: {
		            min: low,
		            max: high,
		            text:['High', 'Low'],
		            top: 'center',
		            calculable: true,
		            inRange: { color: ['lightgreen', 'yellow', 'red']}
		        },
		        title: {
		        	text: 'Heat Map of ' + title + ' over Time for LA County',
		        	subtext: 'Update by:' + today.toDateString()
		    	},
			    series: {
		        	name: 'Los Angeles County',
		            type: 'map',
		            mapType: 'Los Angeles County',
					roam: true,
					aspectScale: 1
			    }	
			},
			options: option_series
		};
		myChart.setOption(option);
	});
}

$.get('/static/json/la_county.json', geoJson => {
	echarts.registerMap('Los Angeles County', geoJson, {});
	drawMap('/static/json/region_density.json', '07', 'Case Density', 0, 0.08);
	drawMap('/static/json/region_R.json', '08', 'Risk Score', 0, 10)
});