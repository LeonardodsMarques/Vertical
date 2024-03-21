# == Schema Information
#
# Table name: categories
#
#  id          :bigint           not null, primary key
#  title       :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  active      :boolean          default(TRUE), not null
#
class Category < ApplicationRecord

end
