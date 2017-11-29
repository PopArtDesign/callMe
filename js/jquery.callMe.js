(function($, window) {

    var defaultOptions = {
        successMessage: 'Form was sent successfully!',
        failureMessage: 'An error has occurred, please try again later!'
    };

    var init = function(options) {
        var $this = this;

        if ($this.data('call-me-enabled')) {
            return true;
        }

        options = $.extend(defaultOptions, options);

        var target = options.target || $this.data('call-me') || $this.attr('href');

        if (!target) {
            throw new TypeError('Call me: tagret not found.');
        }

        var $target = $(target);
        var $messageContainer = $target.find('.call-me-messages');

        var $modal = $(target).easyModal();
        $this.click(function(e) {
            e.preventDefault();
            $modal.trigger('openModal');
        });

        var $form = $(target + ' form');

        if (!$form.data('call-me-enabled')) {
            $form.submit(function(e) {
                e.preventDefault();
                $.ajax(options.action || $form.attr('action'), {
                    data: $form.serialize(),
                    method: $form.attr('method'),
                    dataType: 'json',
                    success: function(data, textStatus) {
                        if ('undefined' !== typeof data.success && data.success) {
                            $messageContainer.html('<p class="call-me-success">' + options.successMessage + '</p>');
                            $form[0].reset();
                        } else {
                            var message = data.message || options.failureMessage;
                            $messageContainer.html('<p class="call-me-failure">' + message + '</p>');
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