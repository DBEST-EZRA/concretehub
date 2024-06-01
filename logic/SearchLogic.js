
export const SearchLogic = (data,input)=> {

return data.filter(item=>item.name.toLowerCase().includes(input.toLowerCase()))
}