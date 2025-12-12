var instruction_trial_1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<p style="font-size: 40px;">欢迎参加本次实验！</p>
        <p style="font-size: 35px;">在实验开始前，请您仔细阅读以下指导语。</p>
        <br>在实验过程中，您将观看一系列短视频，每个视频约10秒，并回答有关问题。
        <br>请您在实验过程中，<b>保持专注</b>，不要打开任何其他程序，保持良好的心态。
        <br>请在一个<b>无人打扰、安静（或佩戴隔音耳机）的环境</b>中进行本次实验。
        <br>本次实验预计耗时15分钟，请确认您在接下来的15分钟内连续完成实验。
        <br>若您有任何问题或意见，请随时联系+86-137367578576或发送邮件至2606025493@qq.com。</p>`,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页'],
    prompt: "<p>若确认理解并同意以上指导语，请点击“下一页”按钮</p>",
    
    record_data: false
};


var instruction_trial_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus:   
        `<p style="font-size: 30px;line-height: 1.5;">请确认您的设备为Chrome浏览器/Microsoft Edge浏览器/Safari浏览器。</p>
        <p style="font-size: 20px;line-height: 1.5;">若您的设备为其他浏览器，请关闭浏览器，使用Chrome浏览器/FireFox浏览器/Microsoft Edge浏览器/Safari浏览器
        <br>重新打开本网页，再点击“下一页”按钮开始实验。</p>`,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页'],
        prompt: "<p>若确认您的设备为Chrome浏览器/Microsoft Edge浏览器/Safari浏览器，请点击“下一页”按钮开始实验。</p>",
}

var instruction_trial = {
    timeline: [instruction_trial_1, instruction_trial_2],
    record_data: false
};



var instructions_1_1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<p style="font-size: 35px;line-height: 1.5;">本实验一共分为<b>三部分</b>，请按照顺序完成。
        <br>每个部分您将观看一系列短视频
        <br>每个视频约<b>10秒</b>，并回答有关问题
        <br>由于网络原因，视频加载需要时间，
        <br>若您未看到视频，请<b>耐心等待</b></p>
        <p style="font-size: 20px;line-height: 1.5;">若确认理解并同意以上指导语，请点击“下一页”按钮。</p>`,
    record_data: false,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页'],

};

var instructions_1_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<p style="font-size: 30px;line-height: 1.5;">
        <b>第一部分</b>
        <br>您将观看20个短视频，
        <br>请您根据直觉判断：
        <br>仅从面孔上看
        <br>视频中出现的<b>人物</b>是否<span style="font-size: 35px;font-weight: bold;">值得相信</span>？ 
        <br>请评价您对您<b>该任务面孔</b>的<b>信任程度</b>
        <br>请尽可能快速、真实地做出反应。
        <br>每个视频只会播放<b>一次</b>，请集中注意力。</p>
        <br>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解以上指导语，请点击“下一页”按钮，开始第一部分实验。</p>`,
    record_data: false,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页']
};

var instructions_1 = {
    timeline: [instructions_1_1, instructions_1_2],
    randomize_order: false,
    repetitions: 1,
    record_data: false
};

var instruction_detection_1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<p style="font-size: 24px;line-height: 1.5;">接下来进入第二部分实验！</p>
        <p style="font-size: 24px;line-height: 1.5;">请您仔细阅读下列材料：</p>
        <p style="font-size: 30px;font-weight: bold;">深度伪造(Deepfake)</p>
        <p style="font-size: 28px;line-height: 1.5;">指的是基于深度学习等智能化方法
        <br>创建或合成视听觉内容(如图像、音视频、文本等)。
        <br>近年来，基于深度伪造的换脸技术开始在网络兴起。
        <br>此类技术可将视频中的人脸替换成目标人物，
        <br>从而制作出目标人物做特定动作的假视频。</p>
        <br>
        <br>
        <p style="font-size: 20px;">确认已全部理解可点击“下一页”按钮。</p>`,
    record_data: false,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页']
};


var instruction_detection_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
    `<p style="font-size: 35px;line-height: 1.5;"><b>第二部分</b></p>
        <p style="font-size: 30px;line-height: 1.5;">您将继续观看20个短视频。<p>
        <p style="font-size: 30px;line-height: 1.5;">在这些视频中，
        <br>有10个人物的面孔是<b>真实</b>的，
        <br>10个人物的面孔是<b>深度伪造</b>的。</p>`,
    record_data: false,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页']
};

var instruction_detection_3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `<p style="font-size: 30px;line-height: 1.5;">请您根据直觉判断：        
        <br>该视频中的<b>人物面孔</b>是否为<span style="font-size: 30px;font-weight: bold;">真实人物</span>或<span style="font-size: 30px;font-weight: bold;">深度伪造</span>
        <br>并评价您对您<b>判断</b>的<b>自信程度</b>
        <br>请尽可能快速、真实地做出反应。
        <br>每个视频只会播放<b>一次</b>，请集中注意力。</p>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解以上指导语，请点击“下一页”按钮。</p>`,
    record_data: false,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页']
};


var instructions_2 = {
    timeline: [instruction_detection_1, instruction_detection_2, instruction_detection_3],
    randomize_order: false,
    repetitions: 1,
    record_data: false
};

var instructions_3 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: 
        `
        <p style="font-size: 24px;line-height: 1.5;">接下来进入第三部分实验！</p>
        <p style="font-size: 30px;line-height: 1.5;">
            <b>第三部分</b>
        <br>您将继续观看短视频。
        <br>请您根据直觉判断：
        <br>视频中出现的<b>人物面孔</b>是否在之前两部分中出现过？ 
        <br>并评价您对您<b>记忆</b>的<b>自信程度</b>
        <br>此外，
        <br>您需要再次判断
        <br>该视频中的<b>人物面孔</b>是否为<span style="font-size: 30px;font-weight: bold;">真实人物</span>或<span style="font-size: 30px;font-weight: bold;">深度伪造</span>
        <br>并评价您对您<b>判断</b>的<b>自信程度</b>
        <br>请尽可能快速、真实地做出反应。
        <br>每个视频只会播放<b>一次</b>，请集中注意力。</p>
        <p style="font-size: 24px;line-height: 1.5;">若确认理解以上指导语，请点击“下一页”按钮。</p>`,
    record_data: false,
    choices: ['<span style="font-size: 25px;line-height: 1.5;">下一页']
};


var instruction_manipulationcheck_1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p style="font-size: 35px;line-height: 1.5;">深度伪造是指？</p>',
    choices: ['<span style="font-size: 25px;line-height: 1.5;">一个人在说谎</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">有人在谈论伪造</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">一个人的面孔/声音<br>经过人工智能技术修改<span>'],
    prompt: "<p>请选择您认为正确的答案。</p>",
    record_data: true
};

var instruction_manipulationcheck_2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p style="font-size: 35px;line-height: 1.5;">以下哪一句是正确的？</p>',
    choices: ['<span style="font-size: 25px;line-height: 1.5;">每个视频有20%的概率是深度伪造</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">每个视频有50%的概率是深度伪造</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">所有视频都是深度伪造</span>'],
    prompt: "<p>请选择您认为正确的答案。</p>",
    record_data: true
};

var instruction_manipulationcheck = {
    timeline: [instruction_manipulationcheck_1, instruction_manipulationcheck_2],
    randomize_order: false,
    repetitions: 1
};

// 将操纵检查添加到instructions_2的时间线中
instructions_2.timeline.push(instruction_manipulationcheck);

var instruction_distractor = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `<p style="font-size: 35px;line-height: 1.5;">
      您可以稍事休息一下，然后继续本实验。
      接下来你将玩一个吃豆人游戏，请准备开始。</p>`,
      choices: ['开始'],
      data: {
          task: 'distractor_instructions',
      },
      record_data: false,
    }

var instructions_check = {
    type: jsPsychHtmlButtonResponse,
    stimulus: '<p style="font-size: 35px;line-height: 1.5;">您是否了解过或做过类似的研究？</p>',
    choices: ['<span style="font-size: 25px;line-height: 1.5;">从未了解过</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">了解过但未做过</span>', 
        '<span style="font-size: 25px;line-height: 1.5;">做过类似的研究</span>'],
    prompt: "<p>请选择您认为正确的答案。</p>",
    record_data: true
    }
