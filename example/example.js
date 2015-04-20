var App = new Marionette.Application();

App.addRegions({
    "mainRegion": "#container"
});

App.start();

$( function() {
    var View1 = Marionette.ItemView.extend({
        template: "#view1",
        viewID: 'view1'
    });
    var View2 = Marionette.ItemView.extend({
        template: "#view2",
        viewID: 'view2'
    });

    var view1 = new View1();
    var view2 = new View2();

    App.mainRegion.show(view1);

    var counter = 0;
    var view = view1;

    var swapViews = function() {
        view = view.$el.find('.view').hasClass('view1') ? view2 : view1;
        var animationType = null;
        switch (counter) {
            case 0: animationType = 'flipLeft'; break;
            case 1: animationType = 'flipRight'; break;
            case 2: animationType = 'slideLeft'; break;
            case 3: animationType = 'slideRight'; break;
            default: animationType = 'default';
        }

        console.log('view',view,'animationType',animationType);
        App.mainRegion.showAnimated(view, { preventDestroy: true, animationType: animationType }); //preventDestroy just for example purposes
        counter++;
        if (counter === 4) counter = 0;
    };

    $('#swapViewsButton').on('click', swapViews);
});



