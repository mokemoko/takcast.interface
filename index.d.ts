/// <reference types="react" />
import * as React from "react";
/**
 * 全てのプラグインの基本
 */
export interface IPlugin {
    /**
     * 名前
     */
    name: string;
    /**
     * プラグインタイプ
     * base:基本
     * field:表示フィールド定義
     * media:メディアデータ合成
     * source:映像音声の元管理
     * output:出力処理管理
     */
    type: string;
    /**
     * pluginロード完了時にcallされる
     * @param plugins type -> [IPlugin]
     */
    setPlugins?(plugins: {
        [type: string]: Array<IPlugin>;
    }): void;
}
/**
 * 基本プラグイン
 */
export interface IBasePlugin extends IPlugin {
    /**
     * audioContext参照
     * @return audioContext
     */
    refAudioContext(): AudioContext;
    /**
     * 破棄用node参照
     */
    refDevnullNode(): AudioNode;
    /**
     * electron動作であるか判定する
     * webとしてアクセスしても動作可能にする場合に利用したい。
     */
    isElectron(): boolean;
}
/**
 * 表示フィールドプラグイン
 */
export interface IFieldPlugin extends IPlugin {
    /**
     * 描画動作
     */
    render(): void;
}
/**
 * メディアデータ合成
 */
export interface IMediaPlugin extends IPlugin {
    /**
     * 合成処理を実施する描画要素
     * @return Reactのコンポーネント
     */
    refBodyComponent(): React.ComponentClass<{}>;
    /**
     * source追加イベント
     * @param 追加するsource
     */
    onAddSource(source: ISource): void;
    /**
     * activeなsourceが変更になったときのイベント
     * @param activeになったsource
     */
    onChangeActiveSource(source: ISource): void;
    /**
     * sourceを破棄するときのイベント
     * @param 破棄するsource
     */
    onRemoveSource(source: ISource): void;
    /**
     * 合成結果の映像canvas参照
     */
    refCanvas(): HTMLCanvasElement;
    /**
     * 合成結果の音声node参照
     */
    refNode(): AudioNode;
    /**
     * 合成結果の音声のボリュームレベルを調整する。
     * @param 0:無音 100:音量max
     */
    setVolume(value: number): void;
}
/**
 * 映像・音声元を管理する
 */
export interface ISourcePlugin extends IPlugin {
    /**
     * ソース選択実行時のpreview表示等
     */
    refPickupComponent(): React.ComponentClass<{}>;
    /**
     * 新しいsourceを作成する
     */
    createNewSource(): ISource;
}
/**
 * 出力管理
 */
export interface IOutputPlugin extends IPlugin {
    /**
     * 設定部の表示
     */
    refSettingComponent(): React.ComponentClass<{}>;
    /**
     * activeなmediaPluginが変更になったときのイベント
     */
    onChangeActiveMedia(media: IMediaPlugin): void;
    /**
     * mediaPluginが削除されたときの動作
     */
    onRemoveMedia(media: IMediaPlugin): void;
}
/**
 * source要素
 */
export interface ISource {
    /**
     * 名称
     */
    name: string;
    /**
     * 動作タイプ
     * video:映像
     * audio:音声
     * 重複OK
     */
    type: string | string[];
    /**
     * 音声node参照
     */
    refAudioNode?(): AudioNode;
    /**
     * 映像要素参照
     */
    refVideoImage?(): HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    /**
     * 解放処理
     */
    release(): void;
    /**
     * 情報参照
     * @param どのmediaに対するものか指定
     */
    refInfo(mediaPlugin: IMediaPlugin): ISourceInfo;
    /**
     * 表示要素参照
     * paletteの部分に表示される要素はhtmlのelementならなんでもOKとしてみたいと思う。
     */
    refDisplayElement(): HTMLElement;
    /**
     * 音量を調整する
     */
    setVolume(volume: number): void;
    /**
     * 音量を参照する
     */
    getVolume(): number;
}
/**
 * source要素が保持してる情報データ
 */
export interface ISourceInfo {
    /**
     * 対応するplugin
     */
    plugin: IMediaPlugin;
    /**
     * 保持しているデータの内容
     */
    data: {};
}
