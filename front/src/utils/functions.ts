export const capitalize = (word: string) => {
    console.log(word.slice(0,1))
    return word.charAt(0).toUpperCase() + word.slice(1)
}