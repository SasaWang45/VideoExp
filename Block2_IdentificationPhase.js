// Block2_IdentificationPhase.js 

/**
 * 创建并返回Block2的完整时间线，包括预加载。
 * @param {object} jsPsych - 已初始化的 jsPsych 实例。
 * @param {Array} Videos - 视频数据数组。
 * @returns {object} 包含Block2时间线的对象。
 */
function getBlock2Procedure(jsPsych, Videos) {
    // block2 刺激材料准备：过滤 Block2_stims === 1 的视频
    var block2_stims = Videos.filter(function(video) {
        return video.Block2_stims === 1;
    });

    // 提取视频路径用于预加载
    var video_paths_block2 = block2_stims.map(function(stim) {
        return stim.Video;
    });

    // 定义自信程度评分的颜色和标签
    var confidenceColors = [
        '#f5f5f5', // 1
        '#f0f0f0', // 2
        '#ebebeb', // 3
        '#e6e6e6', // 4
        '#e1e1e1', // 5
        '#dcdcdc', // 6
        '#d7d7d7'  // 7
    ];
    
    var confidenceLabels = [
        '非常不自信',
        '不自信',
        '有点不自信',
        '中等',
        '有点自信',
        '自信',
        '非常自信'
    ];

    var trial_identification = {
        type: jsPsychSurveyHtmlForm,
        preamble: function() {
            return `
                <div style="text-align: center;">
                    <video 
                        id="video-stimulus-identification" 
                        width="1000" 
                        height="500"
                        autoplay
                        muted
                        style="display: block; margin: 0 auto;">
                        <source src="${jsPsych.evaluateTimelineVariable('Video')}" type="video/mp4">
                        您的浏览器不支持视频播放。
                    </video>
                </div>
            `;
        },
        html: function() {
            // 生成自信程度评分的HTML
            var confidenceOptionsHTML = '';
            for (var i = 1; i <= 7; i++) {
                var color = confidenceColors[i - 1];
                var label = confidenceLabels[i - 1];
                
                confidenceOptionsHTML += `
                    <div style="flex: 1; text-align: center;">
                        <input type="radio" id="confidence_${i}" name="confidence_rating" value="${i}" required>
                        <label for="confidence_${i}" style="cursor: pointer; display: block;">
                            <div style="padding: 10px; margin: 0 5px; border: 2px solid #ddd; border-radius: 5px; background-color: ${color};">
                                <div style="font-weight: bold; font-size: 22px;">${i}</div>
                                <div style="font-size: 16px; margin-top: 5px;">${label}</div>
                            </div>
                        </label>
                    </div>
                `;
            }
            
            return `
                <div style="font-family: Arial, sans-serif; max-width: 1000px; margin: 0; padding: 20px;">
                    <!-- 问题1：是否是深度伪造 -->
                    <div style="margin-bottom: 40px; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                        <h2 style="font-size: 28px; margin-bottom: 20px; color: #333;">
                            您认为该视频<b>是</b>或<b>不是</b>深度伪造？
                        </h2>
                        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 15px;">
                            <div style="display: flex; align-items: center;">
                                <input type="radio" id="yes_deepfake" name="deepfake_judgment" value="是" required>
                                <label for="yes_deepfake" style="font-size: 24px; margin-left: 10px; cursor: pointer;">
                                    <div style="display: flex; align-items: center;">
                                        <div style="width: 50px; height: 50px; border: 2px solid #4CAF50; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                            是
                                        </div>
                                        （深度伪造）
                                    </div>
                                </label>
                            </div>
                            
                            <div style="display: flex; align-items: center;">
                                <input type="radio" id="no_deepfake" name="deepfake_judgment" value="不是" required>
                                <label for="no_deepfake" style="font-size: 24px; margin-left: 10px; cursor: pointer;">
                                    <div style="display: flex; align-items: center;">
                                        <div style="width: 50px; height: 50px; border: 2px solid #f44336; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                            不是
                                        </div>
                                        （真实视频）
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 问题2：自信程度评分 -->
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                        <h2 style="font-size: 28px; margin-bottom: 20px; color: #333;">
                            您对自己的选择有多大程度的<b>自信</b>？
                        </h2>
                        <p style="font-size: 22px; margin-bottom: 20px; color: #666;">
                            <b>提示：</b>请在下方<b>1-7</b> 对您选择的<b>自信程度</b>进行评分
                        </p>
                        
                        <!-- 自信程度评分表格 -->
                        <div style="margin-top: 30px; font-size: 20px; text-align: center;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                ${confidenceOptionsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },
        button_label: "提交",
        data: {
            task: "identification_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        },
        on_load: function() {
            var video = document.getElementById('video-stimulus-identification');
            if (video) {
                video.play().catch(function(e) {
                    console.log("自动播放被阻止:", e);
                });
            }
        },
        on_finish: function(data) {
            // 获取表单响应数据
            var response = data.response;
            
            // 存储深度伪造判断结果
            if (response.deepfake_judgment) {
                data.identification_response = response.deepfake_judgment;
            }
            
            // 存储自信程度评分
            if (response.confidence_rating) {
                data.confidence_rating = parseInt(response.confidence_rating);
            }
            
            // 停止并重置视频
            var video = document.getElementById('video-stimulus-identification');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            
            return data;
        }
    };

    var block2_procedure = {
        timeline: [trial_fixation, trial_identification],
        timeline_variables: block2_stims,
        randomize_order: true,
        repetitions: 1,
        data: {
            task: "identification_phase"
        }
    };

    return block2_procedure;
}
