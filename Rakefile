# frozen_string_literal: true

require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"

GITHUB_REPONAME = "jamstatic/jamstatic-fr".freeze

desc "Génération des fichiers du site"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end

desc "Génération et publication des fichiers sur GitHub"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp
    File.open(".nojekyll", "wb") { |f| f.puts(":dog: food.") }

    system "git init"
    system "git add ."
    message = "Site mise à jour le #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end

require "html-proofer"

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    :empty_alt_ignore => true,
    :disable_external => true
  }).run
end

task :default => "publish"
