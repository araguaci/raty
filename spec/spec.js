describe('Integration', function() {
  beforeEach(function() {
    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

  describe('options', function() {
    beforeEach(function() {
      $.raty.path = '../lib/images';
    });

    describe('#targetText', function() {
      beforeEach(function() {
        $('body').append('<div id="hint"></div>');
      });

      xit ('set target with none value', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ target: '#hint', targetText: 'none' });

        // then
        expect($('#hint')).toHaveHtml('none');
      });
    });

    describe('#targetFormat', function() {
      context('with :target', function() {
        beforeEach(function() {
          $('body').append('<div id="hint"></div>');
        });

        xit ('stars empty', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ target: '#hint', targetFormat: 'score: {score}' });

          // then
          expect($('#hint')).toBeEmpty();
        });

        context('on mouseover', function() {
          xit ('set target with format on mouseover', function() {
            // given
            var self = $('#element').raty({ target: '#hint', targetFormat: 'score: {score}' });

            // when
            self.children('img:first').trigger('mouseover');

            // then
            expect($('#hint')).toHaveHtml('score: bad');
          });
        });

        context('on mouseout', function() {
          xit ('clears the target', function() {
            // given
            var self = $('#element').raty({
              target      : '#hint',
              targetFormat: 'score: {score}'
            });

            // when
            self.children('img:first').trigger('mouseover').trigger('mouseout');

            // then
            expect($('#hint')).toBeEmpty();
          });

          context('with :targetKeep', function() {
            context('without score', function() {
              xit ('clears the target', function() {
                // given
                var self = $('#element').raty({
                  target      : '#hint',
                  targetFormat: 'score: {score}',
                  targetKeep  : true
                });

                // when
                self.children('img:first').trigger('mouseover').trigger('mouseleave');

                // then
                expect($('#hint')).toBeEmpty();
              });
            });

            context('with score', function() {
              xit ('keeps the template', function() {
                // given
                var self = $('#element').raty({
                  score       : 1,
                  target      : '#hint',
                  targetFormat: 'score: {score}',
                  targetKeep  : true
                });

                // when
                self.children('img:first').trigger('mouseover').trigger('mouseleave');

                // then
                expect($('#hint')).toHaveHtml('score: bad');
              });
            });
          });
        });
      });
    });

    describe('#targetScore', function() {
      beforeEach(function() {
        this.score = $('<input id="score" type="text" />').appendTo('body');
      });

      afterEach(function() {
        this.score.remove();
      });

      xit ('avoids the creation of default score field', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ targetScore: '#score' });

        // then
        expect(self.children('input')).not.toExist();
      });

      xit ('changes the place where score will be setted', function() {
        // given
        var
          self = $('#element').raty({ targetScore: '#score' });
        var stars = self.children('img');

        // when
        stars.eq(0).trigger('click');

        // then
        expect(this.score).toHaveValue('1');
      });
    });

    describe('#space', function() {
      context('when off', function() {
        it('keeps the spaces', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ space: true });

          // then
          expect(self.text().length).toEqual(4);
        });

        context('with :cancel', function() {
          it('adds on more space', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ cancel: true, space: true });

            // then
            expect(self.text().length).toEqual(5);
          });
        });
      });

      context('when off', function() {
        it('takes off the spaces', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ space: false });

          // then
          expect(self.text().length).toEqual(0);
        });

        context('with :cancel', function() {
          it('keeps the cancel space', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ cancel: true, space: false });

            // then
            expect(self.text().length).toEqual(1);
          });
        });
      });
    });

    describe('#single', function() {
      context('on mouseover', function() {
        xit ('turns on just one icon', function() {
          // given
          var self = $('#element').raty({ single: true });
          var stars = self.children('img');

          // when
          stars.eq(2).trigger('mouseover');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });

        context('with :iconRange', function() {
          xit ('shows just on icon', function() {
            // given
            var self = $('#element').raty({
              iconRange  : [
                { range: 2, on: 'star-on.png', off: 'star-off.png' },
                { range: 3, on: 'star-on.png', off: 'star-off.png' },
                { range: 4, on: 'star-on.png', off: 'star-off.png' },
                { range: 5, on: 'star-on.png', off: 'star-off.png' }
              ],
              single     : true
            });
            var stars = self.children('img');

            // when
            stars.eq(3).trigger('mouseover');

            // then
            expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
          });
        });
      });

      context('on click', function() {
        xit ('turns on the star', function() {
          // given
          var self  = $('#element').raty({ single: true });
          var stars = self.children('img');

          // when
          stars.eq(2).trigger('mouseover').trigger('click');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });

        context('on mouseout', function() {
          xit ('keeps the score', function() {
            // given
            var self = $('#element').raty({ single: true });
            var stars = self.children('img');

            // when
            stars.eq(2).trigger('mouseover').trigger('click').trigger('mouseleave');

            // then
            expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
          });

          context('and :iconRange', function() {
            xit ('keeps the score', function() {
              // given
              var self = $('#element').raty({
                single    : true,
                iconRange  : [
                  { range: 2, on: 'a.png', off: 'a-off.png' },
                  { range: 3, on: 'b.png', off: 'b-off.png' },
                  { range: 4, on: 'c.png', off: 'c-off.png' },
                  { range: 5, on: 'd.png', off: 'd-off.png' }
                ]
              });
              var stars = self.children('img');

              // when
              stars.eq(3).trigger('mouseover').trigger('click').trigger('mouseleave');

              // then
              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/a-off.png');
              expect(stars.eq(1)).toHaveAttr('src', '../lib/images/a-off.png');
              expect(stars.eq(2)).toHaveAttr('src', '../lib/images/b-off.png');
              expect(stars.eq(3)).toHaveAttr('src', '../lib/images/c.png');
              expect(stars.eq(4)).toHaveAttr('src', '../lib/images/d-off.png');
            });
          });
        });
      });
    });

    describe('#iconRange', function() {
      xit ('uses icon intervals', function() {
        // given
        var self = $('#element');

        // when
        self.raty({
          iconRange: [
            { range: 2, on: 'star-off.png', off: 'star-off.png' },
            { range: 3, on: 'star-off.png', off: 'cancel-off.png' },
            { range: 4, on: 'star-off.png', off: 'cancel-on.png' },
            { range: 5, on: 'star-off.png', off: 'star-half.png' }
          ]
        });

        // then
        var stars = self.children('img');

        expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(2)).toHaveAttr('src', '../lib/images/cancel-off.png');
        expect(stars.eq(3)).toHaveAttr('src', '../lib/images/cancel-on.png');
        expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-half.png');
      });

      context('when off icon is not especified', function() {
        xit ('uses the :starOff icon', function() {
          // given
          var self = $('#element');

          // when
          self.raty({
            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png' }
            ]
          });

          // then
          expect(self.children('img').eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });
      });

      context('on mouseover', function() {
        xit ('uses the on icon', function() {
          // given
          var self = $('#element').raty({
            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png', off: 'star-off.png' }
            ]
          });
          var stars = self.children('img');

          // when
          stars.eq(4).trigger('mouseover');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-on.png');
        });

        context('when on icon is not especified', function() {
          xit ('uses the :starOn icon', function() {
            // given
            var self = $('#element').raty({
              iconRange: [
                { range: 2, off: 'star-off.png', on: 'star-on.png' },
                { range: 3, off: 'star-off.png', on: 'star-on.png' },
                { range: 4, off: 'star-off.png', on: 'star-on.png' },
                { range: 5, off: 'star-off.png' }
              ]
            });
            var stars = self.children('img');

            // when
            stars.eq(4).trigger('mouseover');

            // then
            expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-on.png');
          });
        });
      });

      context('on mouseout', function() {
        xit ('changes to off icons', function() {
          // given
          var self = $('#element').raty({
            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png', off: 'star-off.png' },
            ]
          });
          var stars = self.children('img');

          // when
          stars.eq(4).trigger('mouseover');

          self.trigger('mouseleave');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });

        xit ('keeps the score value', function() {
          // given
          var self = $('#element').raty({
            iconRange  : [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png', off: 'star-off.png' }
            ],
            score      : 1
          });

          // when
          self.children('img').eq(4).trigger('mouseover');

          self.trigger('mouseleave');

          // then
          expect(self.children('input')).toHaveValue('1');
        });

        context('when off icon is not especified', function() {
          xit ('uses the :starOff icon', function() {
            // given
            var self = $('#element').raty({
              iconRange: [
                { range: 2, on: 'star-on.png', off: 'star-off.png' },
                { range: 3, on: 'star-on.png', off: 'star-off.png' },
                { range: 4, on: 'star-on.png', off: 'star-off.png' },
                { range: 5, on: 'star-on.png' }
              ]
            });
            var img = self.children('img').eq(4);

            // when
            img.trigger('mouseover');

            self.trigger('mouseleave');

            // then
            expect(img).toHaveAttr('src', '../lib/images/star-off.png');
          });
        });
      });
    });
  });

  describe('class bind', function() {
    beforeEach(function() {
      $.raty.path = '../lib/images';

      $('body').append('<div class="element"></div><div class="element"></div>');
    });

    afterEach(function() {
      $('.element').remove();
    });

    it('is chainable', function() {
      // given
      var self = $('.element');

      // when
      var els = self.raty();

      // then
      expect(els.eq(0)[0]).toBe(self.eq(0)[0]);
      expect(els.eq(1)[0]).toBe(self.eq(1)[0]);
    });

    xit ('creates the default markup', function() {
      // given
      var self = $('.element');

      // when
      self.raty();

      // then
      var stars  = self.eq(0).children('img');
      var score = self.eq(0).children('input');

      expect(stars.eq(0)).toHaveAttr('title', 'bad');
      expect(stars.eq(1)).toHaveAttr('title', 'poor');
      expect(stars.eq(2)).toHaveAttr('title', 'regular');
      expect(stars.eq(3)).toHaveAttr('title', 'good');
      expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');

      stars  = self.eq(1).children('img');
      score = self.eq(0).children('input');

      expect(stars.eq(0)).toHaveAttr('title', 'bad');
      expect(stars.eq(1)).toHaveAttr('title', 'poor');
      expect(stars.eq(2)).toHaveAttr('title', 'regular');
      expect(stars.eq(3)).toHaveAttr('title', 'good');
      expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');
    });
  });

  describe('functions', function() {
    beforeEach(function() {
      $.raty.path = '../lib/images';
    });

    describe('GET #score', function() {
      xit ('accepts number as string', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: '1' });

        // then
        expect(self.children('input')).toHaveValue('1');
      });

      xit ('accepts float string', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: '1.5' });

        // then
        expect(self.children('input')).toHaveValue('1.5');
      });

      context('with integer score', function() {
        xit ('gets as int', function() {
          // given
          var self = $('#element').raty({ score: 1 });

          // when
          var score = self.data('raty').fnScore();

          // then
          expect(score).toEqual(1);
        });
      });

      context('with float score', function() {
        xit ('gets as float', function() {
          // given
          var self = $('#element').raty({ score: 1.5 });

          // when
          var score = self.data('raty').fnScore();

          // then
          expect(score).toEqual(1.5);
        });
      });

      context('with score zero', function() {
        it('returns an undefined value because it does not exist', function() {
          // given
          var self = $('#element').raty({ score: 0 });

          // when
          var score = self.data('raty').fnScore();

          // then
          expect(score).toBeUndefined();
        });
      });

      context('with score greater than :numberMax', function() {
        xit ('gets the max', function() {
          // given
          var self = $('#element').raty({ number: 50, score: 50 });

          // when
          var score = self.data('raty').fnScore();

          // then
          expect(score).toEqual(self.data('raty').opt.numberMax);
        });
      });
    });

    describe('#click', function() {
      xit ('clicks on star', function() {
        // given
        var self = $('#element').raty({
          click: function() {
            $(this).data('clicked', true);
          }
        });

        // when
        self.data('raty').click(1);

        // then
        expect(self.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
        expect(self.data('clicked')).toBeTruthy();
      });

      it ('receives the score', function() {
        // given
        var self = $('#element').raty({
          click: function(score) {
            this.result = score;
          }
        });

        // when
        self.data('raty').click(1);

        // then
        expect(self[0].result).toEqual(1);
      });

      xit ('receives the event', function() {
        // given
        var self = $('#element').raty({
          click: function(score, evt) {
            $(this).data('evt', evt);
          }
        });

        // when
        self.data('raty').click(1);

        // then
        expect(self.data('evt').type).toEqual('click');
      });

      describe('with :readOnly', function() {
        xit ('does not set the score', function() {
          // given
          var self = $('#element').raty({ readOnly: true });

          // when
          self.data('raty').click(1);

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
        });
      });

      context('without :click', function() {
        it('ignores the callback', function() {
          // given
          var self = $('#element').raty();

          // when
          var lambda = function() { self.data('raty').click(1); };

          // then
          expect(lambda).not.toThrow();
        });
      });

      context('with :target', function() {
        beforeEach(function() {
          $('body').append('<div id="hint"></div>');
        });

        context('and :targetKeep', function() {
          xit ('sets the score on target', function() {
            // given
            var self = $('#element').raty({
              target    : '#hint',
              targetKeep: true,
              click     : function() { }
            });

            // when
            self.data('raty').click(1);

            // then
            expect($('#hint')).toHaveHtml('bad');
          });
        });
      });
    });
  });
});
