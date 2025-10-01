/*
 * Copyright the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * See https://github.com/bmuschko/asciidoctorj-tabbed-code-extension/
 */

function addBlockSwitches() {
    $('.primary').each(function() {
        primary = $(this);
        createSwitchItem(primary, createBlockSwitch(primary)).item.addClass("selected");
        primary.children('.title').remove();
    });
    $('.secondary').each(function(idx, node) {
        secondary = $(node);
        primary = findPrimary(secondary);
        switchItem = createSwitchItem(secondary, primary.children('.switch'));
        switchItem.content.addClass('hidden');
        findPrimary(secondary).append(switchItem.content);
        secondary.remove();
    });
}

function createBlockSwitch(primary) {
    blockSwitch = $('<div class="switch"></div>');
    primary.prepend(blockSwitch);
    return blockSwitch;
}

function findPrimary(secondary) {
    candidate = secondary.prev();
    while (!candidate.is('.primary')) {
        candidate = candidate.prev();
    }
    return candidate;
}

function createSwitchItem(block, blockSwitch) {
    blockName = block.children('.title').text();
    content = block.children('.content').first().append(block.next('.colist'));
    item = $('<div class="switch--item">' + blockName + '</div>');
    item.on('click', '', content, function(e) {
        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');
        e.data.siblings('.content').addClass('hidden');
        e.data.removeClass('hidden');
    });
    blockSwitch.append(item);
    return {'item': item, 'content': content};
}

$(addBlockSwitches);
