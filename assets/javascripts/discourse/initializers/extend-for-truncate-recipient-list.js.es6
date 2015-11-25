import UserSelector from 'discourse/components/user-selector';

export default {
  name: 'extend-for-truncate-recipient-list',

  initialize() {
    UserSelector.reopen({
      truncateRecipientList: function () {
        this.$().on('focusout', function () {
          let $container = $(this).parent(),
            containerWidth = $container.width(),
            $recipients = $container.children().slice(0, -1),
            $addRecipient = $container.children().slice(-1),
            addRecipientWidth = $addRecipient.outerWidth(),
            recipientsWidth = 0,
            hiddenRecipients = 0;

          $recipients.each(function () {
            recipientsWidth += $(this).outerWidth();
            if (recipientsWidth + addRecipientWidth > containerWidth) {
              $(this).hide();
              hiddenRecipients += 1;
              // Todo: translate 'more'
              $addRecipient.attr('placeholder', '+ ' + hiddenRecipients + ' more');
            }
          });
        });
      }.on('didInsertElement'),

      expandRecipientList: function () {
        this.$().on('focus', function () {
          $(this).parent().children().show();
          $(this).attr('placeholder', I18n.t('composer.users_placeholder'));
        });
      }.on('didInsertElement')
    });
  }
}