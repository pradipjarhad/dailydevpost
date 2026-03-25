import Image from './Image'
import SocialIcon from '@/components/social-icons'
import Link from './Link'
import { Authors } from 'contentlayer/generated'

interface Props {
    author: Omit<Authors, '_id' | '_raw' | 'body'>
}

const AuthorCard = ({ author }: Props) => {
    if (!author) return null
    const { name, avatar, occupation, company, email, twitter, linkedin, github } = author

    return (
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 rounded-2xl border border-gray-200 bg-white/50 p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50">
            {avatar && (
                <div className="flex-shrink-0">
                    <Image
                        src={avatar}
                        alt={name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover ring-4 ring-blue-500/20 dark:ring-blue-400/20 shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-105 hover:ring-blue-500 dark:hover:ring-blue-400 hover:shadow-blue-500/20"
                        style={{ width: '6rem', height: 'auto' }}
                    />
                </div>
            )}
            <div className="flex flex-col text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2">
                    <Link href="/about" className="hover:text-primary-500 transition-colors">
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
                            {name}
                        </h3>
                    </Link>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary-500 py-0.5 px-2 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30">
                        {occupation}
                    </div>
                </div>

                {author.description && (
                    <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                        {author.description}
                    </p>
                )}

                <div className="flex space-x-4 justify-center sm:justify-start">
                    {email && <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />}
                    {github && <SocialIcon kind="github" href={github} size={5} />}
                    {linkedin && <SocialIcon kind="linkedin" href={linkedin} size={5} />}
                    {twitter && <SocialIcon kind="twitter" href={twitter} size={5} />}
                </div>
            </div>
        </div>
    )
}

export default AuthorCard
