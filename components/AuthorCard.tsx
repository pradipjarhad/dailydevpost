import Image from './Image'
import SocialIcon from '@/components/social-icons'
import { Authors } from 'contentlayer/generated'

interface Props {
    author: Omit<Authors, '_id' | '_raw' | 'body'>
}

const AuthorCard = ({ author }: Props) => {
    const { name, avatar, occupation, company, email, twitter, linkedin, github } = author

    return (
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 rounded-xl border border-gray-200 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50">
            {avatar && (
                <div className="flex-shrink-0">
                    <Image
                        src={avatar}
                        alt={name}
                        width={100}
                        height={100}
                        className="h-24 w-24 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                    />
                </div>
            )}
            <div className="flex flex-col text-center sm:text-left">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
                    {name}
                </h3>
                <div className="text-xs font-medium uppercase tracking-wider text-primary-500 mb-2">
                    {occupation}
                </div>

                {author.description && (
                    <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {author.description}
                    </p>
                )}

                <div className="flex space-x-4 justify-center sm:justify-start">
                    {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />}
                    {github && <SocialIcon kind="github" href={github} size={6} />}
                    {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={6} />}
                    {twitter && <SocialIcon kind="twitter" href={twitter} size={6} />}
                </div>
            </div>
        </div>
    )
}

export default AuthorCard
