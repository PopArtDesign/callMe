(function($, window) {

    var defaultOptions = {
        successMessage: 'Form was sent successfully!',
        failureMessage: 'An error has occurred, please try again later!',
        secret: 'imnotarobot!',
        zIndex: 10000
    };

    var init = function(options) {
        var $this = this;

        if ($this.data('call-me-enabled')) {
            return true;
        }

        options = $.extend(defaultOptions, options);

        var easyModalOptions = {
            zIndex: function() {
                return options.zIndex;
            }
        };

        var target = options.target || $this.data('call-me') || $this.attr('href');

        if (!target) {
            target = this;
        }

        var $target = $(target);
        var $messageContainer = $target.find('.call-me-messages');

        if (target !== this) {
            var $modal = $(target).easyModal(easyModalOptions);
            $this.click(function(e) {
                e.preventDefault();
                $modal.trigger('openModal');
            });
        }

        var $form = $(target).find('form').first();

        if (!$form.data('call-me-enabled')) {

            if (!$form.children('input[name="_secret"]').length) {
                $form.append('<input name="_secret" type="hidden" value="' + options.secret + '" />');
            }

            $form.submit(function(e) {
                e.preventDefault();
                $.ajax(options.action || $form.attr('action'), {
                    data: $form.serialize(),
                    method: $form.attr('method'),
                    dataType: 'json',
                    success: function(data, textStatus) {
                        if ('undefined' !== typeof data.success && data.success) {
                            $target.removeClass('call-me-failure').addClass('call-me-success');
                            $messageContainer.html('<p class="call-me-message">' + options.successMessage + '</p>');
                            $form[0].reset();
                        } else {
                            var message = data.message || options.failureMessage;
                            $target.removeClass('call-me-success').addClass('call-me-failure');
                            $messageContainer.html('<p class="call-me-message">' + message + '</p>');
                        }
                    },
                    error: function() {
                        $messageContainer.html('<p class="call-me-failure">' + options.failureMessage + '</p>');
                    }
                });
            });

            $form.data('call-me-enabled', true);
        }

        $this.data('call-me-enabled', true);
    }

    $.fn.callMe = function(options) {
        this.each(function() {
            init.call($(this), options)
        });

        return this;
    }
})(window.jQuery, window);
