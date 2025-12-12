// Block3_RecognitionPhase.js 

/**
 * 创建并返回Block3的完整时间线，包括预加载。
 * @param {object} jsPsych - 已初始化的 jsPsych 实例。
 * @param {Array} Videos - 视频数据数组。
 * @returns {object} 包含Block3时间线的对象。
 */
function getBlock3Procedure(jsPsych, Videos) {
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

    // 合并的试次：包含记忆判断和深度伪造检测
    var trial_combined = {
        type: jsPsychSurveyHtmlForm,
        preamble: function() {
            return `
                <div style="text-align: center;">
                    <video 
                        id="video-stimulus-combined" 
                        width="1000" 
                        height="500"
                        autoplay
                        muted
                        style="display: block; margin: 0 auto;"
                        onended="this.pause()">
                        <source src="${jsPsych.evaluateTimelineVariable('Video')}" type="video/mp4">
                        您的浏览器不支持视频播放。
                    </video>
                    <p style="font-size: 18px; color: #666; margin-top: 10px;">
                        视频正在自动播放一次，请仔细观看后进行判断。
                    </p>
                </div>
            `;
        },
        html: function() {
            // 生成记忆判断自信程度评分的HTML
            var memoryConfidenceOptionsHTML = '';
            var detectionConfidenceOptionsHTML = '';
            
            for (var i = 1; i <= 7; i++) {
                var color = confidenceColors[i - 1];
                var label = confidenceLabels[i - 1];
                
                // 记忆判断的自信程度选项
                memoryConfidenceOptionsHTML += `
                    <div style="flex: 1; text-align: center;">
                        <input type="radio" id="recognition_confidence_${i}" name="recognition_confidence" value="${i}" required>
                        <label for="recognition_confidence_${i}" style="cursor: pointer; display: block;">
                            <div style="padding: 10px; margin: 0 5px; border: 2px solid #ddd; border-radius: 5px; background-color: ${color};">
                                <div style="font-weight: bold; font-size: 22px;">${i}</div>
                                <div style="font-size: 16px; margin-top: 5px;">${label}</div>
                            </div>
                        </label>
                    </div>
                `;
                
                // 深度伪造检测的自信程度选项
                detectionConfidenceOptionsHTML += `
                    <div style="flex: 1; text-align: center;">
                        <input type="radio" id="detection_confidence_${i}" name="detection_confidence" value="${i}" required>
                        <label for="detection_confidence_${i}" style="cursor: pointer; display: block;">
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
                    <!-- 第一部分：记忆判断 -->
                    <div style="margin-bottom: 40px; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                        
                        <!-- 问题1：是否记忆过 -->
                        <div style="margin-bottom: 30px;">
                            <h3 style="font-size: 24px; margin-bottom: 15px; color: #444;">
                                您<b>是</b>或<b>否</b>记忆过视频中的这个人？
                            </h3>
                            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 15px;">
                                <div style="display: flex; align-items: center;">
                                    <input type="radio" id="yes_memory" name="memory_judgment" value="记忆过" required>
                                    <label for="yes_memory" style="font-size: 22px; margin-left: 10px; cursor: pointer;">
                                        <div style="display: flex; align-items: center;">
                                            <div style="width: 50px; height: 50px; border: 2px solid #4CAF50; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                                是
                                            </div>
                                            记忆过
                                        </div>
                                    </label>
                                </div>
                                
                                <div style="display: flex; align-items: center;">
                                    <input type="radio" id="no_memory" name="memory_judgment" value="没记忆" required>
                                    <label for="no_memory" style="font-size: 22px; margin-left: 10px; cursor: pointer;">
                                        <div style="display: flex; align-items: center;">
                                            <div style="width: 50px; height: 50px; border: 2px solid #f44336; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                                否
                                            </div>
                                            没记忆
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 问题2：记忆判断自信程度评分 -->
                        <div>
                            <h3 style="font-size: 24px; margin-bottom: 15px; color: #444;">
                                您对自己的记忆判断有多大程度的<b>自信</b>？
                            </h3>
                            <p style="font-size: 20px; margin-bottom: 20px; color: #666;">
                                <b>提示：</b>请在下方<b>1-7</b> 对您选择的<b>自信程度</b>进行评分
                            </p>
                            
                            <!-- 自信程度评分表格 -->
                            <div style="margin-top: 20px; font-size: 18px; text-align: center;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                    ${memoryConfidenceOptionsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 第二部分：深度伪造检测 -->
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
                        
                        <!-- 问题3：是否是深度伪造 -->
                        <div style="margin-bottom: 30px;">
                            <h3 style="font-size: 24px; margin-bottom: 15px; color: #444;">
                                您认为该视频<b>是</b>或<b>否</b>为<b>深度伪造</b>？
                            </h3>
                            <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 15px;">
                                <div style="display: flex; align-items: center;">
                                    <input type="radio" id="yes_detection" name="detection_judgment" value="是" required>
                                    <label for="yes_detection" style="font-size: 22px; margin-left: 10px; cursor: pointer;">
                                        <div style="display: flex; align-items: center;">
                                            <div style="width: 50px; height: 50px; border: 2px solid #4CAF50; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                                是
                                            </div>
                                            （深度伪造）
                                        </div>
                                    </label>
                                </div>
                                
                                <div style="display: flex; align-items: center;">
                                    <input type="radio" id="no_detection" name="detection_judgment" value="否" required>
                                    <label for="no_detection" style="font-size: 22px; margin-left: 10px; cursor: pointer;">
                                        <div style="display: flex; align-items: center;">
                                            <div style="width: 50px; height: 50px; border: 2px solid #f44336; border-radius: 5px; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                                否
                                            </div>
                                            （真实视频）
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 问题4：深度伪造检测自信程度评分 -->
                        <div>
                            <h3 style="font-size: 24px; margin-bottom: 15px; color: #444;">
                                您对自己的深度伪造判断有多大程度的<b>自信</b>？
                            </h3>
                            <p style="font-size: 20px; margin-bottom: 20px; color: #666;">
                                <b>提示：</b>请在下方<b>1-7</b> 对您选择的<b>自信程度</b>进行评分
                            </p>
                            
                            <!-- 自信程度评分表格 -->
                            <div style="margin-top: 20px; font-size: 18px; text-align: center;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                                    ${detectionConfidenceOptionsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        },
        button_label: "提交",
        data: {
            task: "recognition_phase",
            VideoID: jsPsych.timelineVariable('ID'),
            Authenticity: jsPsych.timelineVariable('Authenticity'),
            Familiarity: jsPsych.timelineVariable('Familiarity')
        },
        on_load: function() {
            var video = document.getElementById('video-stimulus-combined');
            if (video) {
                // 移除控制功能
                video.removeAttribute('controls');
                
                // 自动播放视频
                video.play().catch(function(e) {
                    console.log("自动播放被阻止:", e);
                });
                
                // 监听视频结束事件
                video.onended = function() {
                    // 视频结束后保持暂停状态
                    video.pause();
                };
                
                // 防止右键菜单控制
                video.oncontextmenu = function(e) {
                    e.preventDefault();
                    return false;
                };
            }
        },
        on_finish: function(data) {
            // 获取表单响应数据
            var response = data.response;
            
            // 存储记忆判断结果
            if (response.memory_judgment) {
                data.recognition_response = response.memory_judgment;
            }
            
            // 存储记忆判断自信程度评分
            if (response.recognition_confidence) {
                data.recognition_confidence = parseInt(response.recognition_confidence);
            }
            
            // 存储深度伪造判断结果
            if (response.detection_judgment) {
                data.detection_response = response.detection_judgment;
            }
            
            // 存储深度伪造判断自信程度评分
            if (response.detection_confidence) {
                data.detection_confidence = parseInt(response.detection_confidence);
            }
            
            // 停止并重置视频
            var video = document.getElementById('video-stimulus-combined');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            
            return data;
        }
    };

    var block3_procedure = {
        timeline: [trial_fixation, trial_combined],
        timeline_variables: Videos,
        randomize_order: true,
        repetitions: 1,
        data: {
            task: "recognition_phase"
        }
    };

    return block3_procedure;
}
