// Block1_LearningPhase.js

/**
 * 创建并返回Block1的完整时间线，包括预加载。
 * @param {object} jsPsych - 已初始化的 jsPsych 实例。
 * @param {Array} Videos - 视频数据数组。
 * @returns {object} 包含Block1时间线的对象。
 */
function getBlock1Procedure(jsPsych, Videos) {
     // block1 刺激材料准备：过滤 Block1_stims === 1 的视频
    var block1_stims = Videos.filter(function(video) {
        return video.Block1_stims === 1;
    });

    // 提取视频路径用于预加载（假设视频在 ./Videos_exp/ 子目录下）
    var video_paths_block1 = block1_stims.map(function(stim) {
        return stim.Video;  // Prepend directory if needed; remove './Videos_exp/' if videos are in current dir
    });

    // 整合版
    var trial_credibility_conbination = {
        type: jsPsychHtmlButtonResponse,
        stimulus: function() {
            // 构建包含视频和提示的HTML
            return `
                <div style="text-align: center;">
                    <video 
                        id="video-stimulus" 
                        width="1000" 
                        height="500"
                        autoplay
                        muted
                        style="display: block; margin: 0 auto;">
                        <source src="${jsPsych.evaluateTimelineVariable('Video')}" type="video/mp4">
                        您的浏览器不支持视频播放。
                    </video>
                    <p style='font-size:30px; margin-top: 20px;'>
                        从面孔上看，您认为该视频中的人<b>是</b>或<b>否</b>值得相信？
                    </p>
                </div>
                    <div style="margin-top: 30px; font-size: 30px; line-height: 1;">
                    <p><b>提示：</b>请在下方<b>1-7</b> 对该视频中的人值得/不值得相信<b>程度</b>评分</p>
                </div>
                
                <div style="margin-top: 30px; font-size: 24px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #f5f5f5;">
                                <b>1</b><br>非常不相信
                            </td>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #f0f0f0;">
                                <b>2</b><br>不相信
                            </td>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #ebebeb;">
                                <b>3</b><br>有点不相信
                            </td>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #e6e6e6;">
                                <b>4</b><br>中等
                            </td>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #e1e1e1;">
                                <b>5</b><br>有点相信
                            </td>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #dcdcdc;">
                                <b>6</b><br>相信
                            </td>
                            <td style="text-align: center; padding: 10px; border: 1px solid #ccc; background-color: #d7d7d7;">
                                <b>7</b><br>非常相信
                            </td>
                        </tr>
                    </table>
                </div>
            `;
        },
        choices: ['1', '2', '3', '4', '5', '6', '7'],
        prompt: "", // prompt已整合到stimulus中
        data: {
            task: "learning_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        },
        on_load: function() {
            // 确保视频自动播放
            var video = document.getElementById('video-stimulus');
            if (video) {
                video.play().catch(function(e) {
                    console.log("自动播放被阻止:", e);
                });
            }
        },
        on_finish: function(data) {
        // 将按键值转换为数字并存储在数据中
        if (data.response) {
            data.confidence_rating = parseInt(data.response);
        }
        var video = document.getElementById('video-stimulus');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            return data;
        },
        
    // 添加按键反馈
        on_start: function() {
            // 存储当前试次的ID，以便在按键事件中更新显示
            this.trial_id = jsPsych.timelineVariable('ID');
        }


    };


    var block1_procedure = {
        timeline: [trial_fixation, trial_credibility_conbination],
        timeline_variables: block1_stims,  // 直接传入过滤后的数组
        randomize_order: true,
        repetitions: 1,
        data: {
            task: "learning_phase"
    }
};
       return block1_procedure;

}
