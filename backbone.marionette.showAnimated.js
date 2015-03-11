/**
 * Created by marcinkrysiak on 25/02/15.
 */

_.extend(Marionette.Region.prototype, {

    animationType: 'default',

    attachHtml: function (view) {

        var self = this,
            oldView = this.currentView,
            newView = view;

        switch(this.animationType) {

            case 'flipLeft':
                console.log('region.showAnimated(): flipLeft');

                //animate out old view
                TweenMax.to(oldView.$el, 0.5, {css: {rotationY: -90}, ease: Power2.easeIn, onComplete: function() {

                    //empty old view
                    self.el.innerHTML = ''; //from the original attachHtml method

                    //reset the old view position
                    TweenMax.set(oldView.$el, {rotationY: 0});

                    //prepare the new view
                    TweenMax.set(newView.$el, {rotationY: 90});

                    //show the new view
                    self.el.appendChild(newView.el); //from the original attachHtml method

                    //animate in the new view
                    TweenMax.to(newView.$el, 0.5, {rotationY: 0, ease: Power2.easeOut});
                }});
                break;

            case 'flipRight':
                console.log('region.showAnimated(): flipRight');

                //animate out old view
                TweenMax.to(oldView.$el, 0.5, {css:{rotationY: 90}, ease:Power2.easeIn, onComplete:function() {

                    //empty old view
                    self.el.innerHTML = ''; //from the original attachHtml method

                    //reset the old view position
                    TweenMax.set(oldView.$el, {rotationY: 0});

                    //prepare the new view
                    TweenMax.set(newView.$el, {rotationY: -90});

                    //show the new view
                    self.el.appendChild(newView.el); //from the original attachHtml method

                    //animate in the new view
                    TweenMax.to(newView.$el, 0.5, {rotationY: 0, ease:Power2.easeOut});
                }});
                break;

            case 'slideLeft':
                console.log('region.showAnimated(): slideLeft');
                TweenMax.to(oldView.$el.children(), 0.5, {left:'-110%', ease:Power2.easeInOut, onComplete:function() {

                    //empty old view
                    self.el.innerHTML = ''; //from the original attachHtml method

                    //reset the old view position
                    TweenMax.set(oldView.$el.children(), {left: 0});

                    //prepare the new view
                    TweenMax.set(newView.$el.children(), {left:'110%'});

                    //show the new view
                    self.el.appendChild(newView.el); //from the original attachHtml method

                    //animate in the new view
                    TweenMax.to(newView.$el.children(), 0.5, {left:0, ease:Power2.easeInOut});
                }});
                break;

            case 'slideRight':
                console.log('region.showAnimated(): slideRight');
                TweenMax.to(oldView.$el.children(), 0.5, {left:'+110%', ease:Power2.easeInOut, onComplete:function() {

                    //empty old view
                    self.el.innerHTML = ''; //from the original attachHtml method

                    //reset the old view position
                    TweenMax.set(oldView.$el.children(), {left: 0});

                    //prepare the new view
                    TweenMax.set(newView.$el.children(), {left:'-110%'});

                    //show the new view
                    self.el.appendChild(newView.el); //from the original attachHtml method

                    //animate in the new view
                    TweenMax.to(newView.$el.children(), 0.5, {left:0, ease:Power2.easeInOut});
                }});
                break;

            default:
                //console.log('region.show(): default');
                this.el.innerHTML = '';
                this.el.appendChild(view.el);
        }

        this.animationType = 'default';
    },

    showAnimated: function(view, options) {

        options = options || {};
        this.animationType = options.animationType || 'default';
        //options.preventDestroy = true;

        var oldView = this.currentView;

        this.show( view, _.extend(options, { preventDestroy: true }) );

        //destroy oldView if not preventDestroy = true
        if ( !options.preventDestroy ) {
            oldView.destroy();
        }

    }
});
