describe('#fn_cancel', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  describe('with :readOnly', function() {
    it ('does turns the stars off', function() {
      // given
      this.el.raty({ readOnly: true, score: 5 });

      // when
      this.el.data('raty').fnCancel();

      // then
      expect(this.el.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
    });

    it ('does not remove the score input value', function() {
      // given
      this.el.raty({ readOnly: true, score: 5 });

      // when
      this.el.data('raty').fnCancel();

      // then
      expect(this.el.children('input')).toHaveValue('5');
    });
  });

  context('with click trigger', function() {
    context('as *false', function() {
      it ('does not triggers click callback', function() {
        // given
        this.el.raty({
          score: 1,
          click: function() {
            this.clicked = true;
          }
        });

        // when
        this.el.data('raty').fnCancel(false);

        // then
        expect(this.el[0].clicked).toBeFalsy();
      });

      context('with :target', function() {
        beforeEach(function() {
          this.target = Helper.create('#target');
        });

        context('and :targetKeep', function() {
          context('as *true', function() {
            it ('sets the :targetText on target', function() {
              // given
              this.el.raty({
                cancel     : true,
                target     : '#target',
                targetKeep : true,
                targetText : 'targetText'
              });

              // when
              this.el.data('raty').fnCancel();

              // then
              expect(this.target.text()).toEqual('targetText');
            });
          });
        });
      });
    });

    context('as *true', function() {
      it ('triggers the :click callback', function() {
        // given
        this.el.raty({
          score: 1,
          click: function() {
            this.clicked = true;
          }
        });

        // when
        this.el.data('raty').fnCancel(true);

        // then
        expect(this.el[0].clicked).toBeTruthy();
      });

      context('with :target', function() {
        beforeEach(function() {
          this.target = Helper.create('#target');
        });

        context('and :targetKeep', function() {
          context('as *true', function() {
            it ('sets the :targetText on target', function() {
              // given
              this.el.raty({
                cancel     : true,
                target     : '#target',
                targetKeep : true,
                targetText : 'targetText'
              });

              // when
              this.el.data('raty').fnCancel(true);

              // then
              expect(this.target.text()).toEqual('targetText');
            });
          });
        });
      });
    });
  });
});
