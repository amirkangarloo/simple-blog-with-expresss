'use strict';

const settingModel = require('@models/settings');
const {settingStatus} = require('@models/settings/settingStatus');

exports.index = async (req, res) => {
    const settings = await settingModel.findAll();
    const presentedSettings = {};
    settings.forEach((item) => {
        presentedSettings[item.setting_name] = item.setting_value;
    });
    res.render(
        'admin/settings/index', {
            layout: "admin",
            config: presentedSettings,
            settingStatus: settingStatus,
            helpers: {
                isChecked: (value, options) => {
                    return value === "true" ? options.fn(this) : options.inverse(this);
                },
            }
        }
    );
}

exports.store = async (req, res) => {
    const settings = req.body;
    let updateFields = {
        ...settings
    };
    if ('users_can_register' in settings === false) {
        updateFields = {
            ...updateFields,
            'users_can_register': settingStatus.FALSE
        };
    }
    if ('users_can_submit_comments' in settings === false) {
        updateFields = {
            ...updateFields,
            'users_can_submit_comments': settingStatus.FALSE
        };
    }
    const result = await settingModel.update(updateFields);
    res.redirect('/admin/settings');
}