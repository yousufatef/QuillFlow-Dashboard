import CustomInput, { CustomTextarea } from "@/components/forms";
import { CustomImageUploader } from "@/components/shared/customs";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function BasicInfoForm() {
    const { t } = useTranslation()
    const { control } = useFormContext();

    return (
        <div className='flex flex-col gap-5 border-b border-neutral-50 pb-4'>
            <h2 className='text-xl font-bold text-gray-900'>
                {t("forms.labels.basic_info")}
            </h2>

            <div className='flex items-start gap-4'>

                <CustomInput
                    control={control}
                    label={t("forms.labels.blog_title_en")}
                    name='titleEn'
                    placeholder="e.g. Beginner's Guide to Gold Investment"
                />
                <CustomInput
                    control={control}
                    label={t("forms.labels.blog_title_ar")}
                    name='titleAr'
                    placeholder="مثلا. دليل المبتدئين للاستثمار في الذهب"
                />
            </div>
            <div className='flex items-start gap-4'>

                <CustomTextarea
                    control={control}
                    label={t("forms.labels.blog_description_en")}
                    name='descriptionEn'
                    placeholder='Write a short summary that explains what users will learn from this article....'
                    trimValue={false}
                    className="max-h-40"
                />
                <CustomTextarea
                    control={control}
                    label={t("forms.labels.blog_description_ar")}
                    name='descriptionAr'
                    placeholder='اكتب ملخصًا قصيرًا يوضح ما سيتعلمه المستخدمون من هذا المقال.'
                    trimValue={false}
                    className="max-h-40"
                />
            </div>

            <CustomImageUploader
                control={control}
                name='coverImage'
                previewFieldName='coverPreview'
            />
        </div>
    );
}



export default BasicInfoForm